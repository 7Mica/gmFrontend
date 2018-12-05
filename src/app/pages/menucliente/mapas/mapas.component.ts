import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MouseEvent, GoogleMapsAPIWrapper } from '@agm/core';
import { EventoService } from 'src/app/services/service.index';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SWALCONFIG_TOAST } from 'src/app/config/config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements OnInit {
  lat: number;
  lng: number;
  zoom = 12;
  idevento: any;

  croquis: File;
  croquisForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService,
    private formBuilder: FormBuilder) {
    this.idevento = this.activatedRoute.snapshot.params.idevento;
    this.getMapa();

    this.croquisForm = this.formBuilder.group(
      {
        croquis: new FormControl(null),
      });

  }

  ngOnInit() {

  }

  uploadDocument(archivo: File) {
    if (!archivo) {
      this.croquis = null;
      return;
    }
    this.croquis = archivo;
  }

  mapClicked(event: MouseEvent) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }

  guardarMapa() {
    this.eventoService.newLocation(this.idevento, { lat: this.lat, lng: this.lng }).subscribe(res => {
      const toast = SWALCONFIG_TOAST;
      toast.type = 'success';
      toast.title = 'Se actualizó la localización';
      swal(toast);

    }, error => {
      const toast = SWALCONFIG_TOAST;
      toast.type = 'error';
      toast.title = 'Ocurrió un error al actualizar la localización';
      swal(toast);

    });

  }

  guardarCroquis() {
    const uploadData = new FormData();
    if (this.croquis) {
      uploadData.append('croquis', this.croquis, this.croquis.name);
    } else {
      uploadData.append('croquis', null);
    }
  }

  getMapa() {

    this.eventoService.getLocation(this.idevento).subscribe((res: any) => {
      if (!res.evento.mapa) {
        this.lat = 51.673858;
        this.lng = 7.815982;

      } else {
        this.lat = parseFloat(res.evento.mapa.latitude);
        this.lng = parseFloat(res.evento.mapa.longitude);
      }


    }, error => {
      console.log(error);

    });

  }
}
