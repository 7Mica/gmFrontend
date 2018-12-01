import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ConferenciaService } from 'src/app/services/service.index';
import { ConferenciacuComponent } from './conferenciacu/conferenciacu.component';
import { DetalleconferenciaComponent } from '../modales/detalleconferencia/detalleconferencia.component';

@Component({
  selector: 'app-conferencias',
  templateUrl: './conferencias.component.html',
  styleUrls: ['./conferencias.component.css']
})
export class ConferenciasComponent implements OnInit {
  conferencias: any[] = [];
  tempConferencias: any[] = [];
  modalRef: BsModalRef;
  menuActivado = false;
  busqueda: string;

  constructor(
    private conferenciaService: ConferenciaService,
    private modalService: BsModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.listaConferencias();
  }

  ngOnInit() { }

  openModal() {
    const evento = this.activatedRoute.snapshot.params.idevento;
    const modalRef = this.modalService.show(ConferenciacuComponent, {
      class: 'modal-xl',
      initialState: {
        title: 'Crear nueva conferencia',
        data: evento

      }
    });

    modalRef.content.action.subscribe(() => {
      this.conferencias = [];
      this.listaConferencias();
    });
  }

  listaConferencias() {
    const conferenciaid = this.activatedRoute.snapshot.params.idevento;
    this.conferenciaService.getConferencias(conferenciaid).subscribe(
      (res: any) => {
        // this.conferencias = res.conferencias.filter(item => item.ponente.marcas);
        this.conferencias = res.conferencias;
        this.tempConferencias = res.conferencias;
      },
      error => {
        console.log(error);
      }
    );
  }

  sortBy(metodo) {
    switch (metodo) {
      case 'nombre':
        this.conferencias.sort((a, b) => a.titulo < b.titulo ? -1 : 1);
        break;

      case 'fecha':
        this.conferencias.sort((a, b) => new Date(a.fecha).getHours() < new Date(b.fecha).getHours() ? -1 : 1);
        break;

      case 'ponente':
        this.conferencias.sort((a, b) => a.ponente.nombre < b.ponente.nombre ? -1 : 1);
        break;

      default:
        break;
    }
  }

  findConference(e) {
    if (e.key === 'Escape') {
      this.busqueda = '';
      this.conferencias = this.tempConferencias;
    } else {
      this.conferencias = this.conferencias.filter((item: any) => (item.titulo.indexOf(this.busqueda) > -1));
    }
  }

  openDetalleConferencia(idconferencia, idmarca) {
    const modalRef = this.modalService.show(DetalleconferenciaComponent, {
      class: 'modal-lg',
      initialState: {
        title: 'Detalle conferencia',
        idconferencia: idconferencia,
        marca: idmarca
      }
    });
    modalRef.content.action.subscribe(() => {
      this.listaConferencias();
    });
  }
}
