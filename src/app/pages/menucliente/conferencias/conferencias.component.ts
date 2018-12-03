import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ConferenciaService } from 'src/app/services/service.index';
import { ConferenciacuComponent } from './conferenciacu/conferenciacu.component';
import { DetalleconferenciaComponent } from '../modales/detalleconferencia/detalleconferencia.component';
import swal from 'sweetalert2';
import { SWALCONFIG_TOAST, SWALCONFIG_ALERT } from 'src/app/config/config';

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
    const idevento = this.activatedRoute.snapshot.params.idevento;
    const modalRef = this.modalService.show(ConferenciacuComponent, {
      class: 'modal-xl',
      initialState: {
        title: 'Crear nueva conferencia',
        idevento: idevento,

      }
    });

    modalRef.content.action.subscribe(() => {
      this.listaConferencias();
    });
  }

  listaConferencias() {
    const idevento = this.activatedRoute.snapshot.params.idevento;
    this.conferenciaService.getConferencias(idevento).subscribe(
      (res: any) => {
        // this.conferencias = res.conferencias.filter(item => item.ponente.marcas);
        console.log(res);

        this.conferencias = res.conferencias;
        this.tempConferencias = res.conferencias;
      },
      error => {

        const toast = SWALCONFIG_TOAST;
          toast.type = 'error';
          toast.title = 'Ocurrió un error en la petición de conferencias';
          swal(toast);
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

  modificarConferencia(idconferencia) {

    const idevento = this.activatedRoute.snapshot.params.idevento;

    const modalRef = this.modalService.show(ConferenciacuComponent, {
      class: 'modal-xl',
      initialState: {
        title: 'Modificar conferencia',
        idevento: idevento,
        idconferencia: idconferencia

      }
    });

    modalRef.content.action.subscribe(() => {
      this.listaConferencias();
    });

  }

  openDetalleConferencia(conferencia) {

    if (!conferencia.ponente) {
      const alert = SWALCONFIG_ALERT;
      alert.title = 'Advertencia';
      alert.text = 'La conferencia a la que intenta acceder no tiene ponente asignado. ' +
      'Edite la conferencia y añada un ponente para poder abrir los detalles.';
      alert.type = 'error';

      swal(alert);

      return;
    }
    const modalRef = this.modalService.show(DetalleconferenciaComponent, {
      class: 'modal-lg',
      initialState: {
        title: 'Detalle conferencia',
        idconferencia: conferencia._id,
        marca: conferencia.ponente.marcas
      }
    });
    modalRef.content.action.subscribe(() => {
      this.listaConferencias();
    });
  }
}
