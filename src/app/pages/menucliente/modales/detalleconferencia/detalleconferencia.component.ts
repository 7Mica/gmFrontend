import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConferenciaService, EventoService } from 'src/app/services/service.index';
import { Observable, Observer } from 'rxjs';
import { SWALCONFIG_CONFIRMDELETE, SWALCONFIG_TOAST, IMAGEHOSTUSUARIOEVENTO, TABLE } from 'src/app/config/config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalleconferencia',
  templateUrl: './detalleconferencia.component.html',
  styleUrls: ['./detalleconferencia.component.css']
})
export class DetalleconferenciaComponent implements OnInit {
  @Output()
  action = new EventEmitter();

  conferencia: any = {};
  ponente: any = {};
  marca: any;
  data: any;
  img: any;
  settings = TABLE;
  source: any[] = [];

  constructor(private modalRef: BsModalRef,
    private modalService: BsModalService,
    private conferenciaService: ConferenciaService,
    private eventoService: EventoService) {

    this.data = this.modalService.config.initialState;
    this.settings.columns = {

      nombre: {
        title: 'Nombre'
      },
      apellidoPaterno: {
        title: 'Apellido Paterno'
      },
      apellidoMaterno: {
        title: 'Apellido Materno'
      }

    };

    this.conferenciaService.getConferenciaById(this.data.idconferencia).subscribe((res: any) => {

      this.source = res.conferencias[0].asistentes
                      .filter(conferencia => conferencia.asistencia[0].entrada && conferencia.asistencia[0].salida);



      this.conferencia = res.conferencias[0];
      this.ponente = this.conferencia.ponente;
      this.ponente.img = IMAGEHOSTUSUARIOEVENTO + this.ponente.img;

    },
      _error => {

      });

    this.getMarca(this.data.marca);

  }

  ngOnInit() {

  }

  getMarca(idmarca) {
    this.eventoService.getMarcaById(idmarca).subscribe((res: any) => {

      this.marca = (res.data) ? res.data.marcas[0] : null;

    }, error => {
      const toast = SWALCONFIG_TOAST;
      toast.type = 'error';
      toast.title = 'Ocurrió un error en la petición';
      swal(toast);
    });
  }

  borrarConferencia(conferencia) {
    const swalert = SWALCONFIG_CONFIRMDELETE;
    swalert.text = '¿La conferencia será borrada permanentemente?';
    swal(swalert)
      .then(res => {
        if (res.value) {
          console.log('Conferencia borrada');
          this.conferenciaService.eliminarConferencia(conferencia).subscribe(
            _res => {
              const toast: any = SWALCONFIG_TOAST;
              swal(toast);
              this.modalRef.hide();
              this.action.emit();
            },

            _error => {
              const toast: any = SWALCONFIG_TOAST;
              toast.titulo = 'Algo salió mal en la petición';
              toast.type = 'error';
              swal(toast);
            }
          );

        } else {

        }
      })
      .catch(error => {
        console.log(error);

      });

  }


}
