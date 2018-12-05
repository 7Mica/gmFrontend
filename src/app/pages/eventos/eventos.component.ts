import { Component, OnInit } from '@angular/core';
import { EventoService, SharedService, UsuarioService } from 'src/app/services/service.index';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EventocuComponent } from './eventocu/eventocu.component';
import { Router } from '@angular/router';
import { SWALCONFIG_TOAST } from 'src/app/config/config';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventos: any[] = [];
  tempEventos: any[] = [];
  url = ['/eventos'];

  modalRef: BsModalRef;

  busqueda: any;
  menuActivado = false;
  evento = false;
  cliente = false;

  constructor(
    private _eventoService: EventoService,
    private modalService: BsModalService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.listaEventos();
    if (this.router.url === '/eventos') {
      this.menuActivado = true;
    }
    if (usuarioService.tipoLogin() === false) {
      this.cliente = true;
    }

  }

  sortBy(metodo) {
    switch (metodo) {
      case 'nombre':
        this.eventos.sort((a, b) => a.titulo < b.titulo ? -1 : 1);
        break;

      case 'fecha':
        this.eventos.sort((a, b) => new Date(a.fechainicio).getDate() < new Date(b.fechafechainicio).getDate() ? -1 : 1);
        break;
      default:
        break;
    }
  }

  findEvento(e) {
    if (e.key === 'Escape') {
      this.busqueda = '';
      this.eventos = this.tempEventos;
    } else {
      this.eventos = this.eventos.filter((item: any) => (item.titulo.indexOf(this.busqueda) > -1));
    }
  }

  activo() {
    if (!this.cliente && this.menuActivado) {
      return true;
    } else {
      return false;
    }
  }

  displayCounter(count) {
    this.url = count.router.url.split('/');
  }

  displayDesactivate(some) {
    if (some.router.url === '/eventos') {
      this.listaEventos();
      this.menuActivado = true;
    }
    this.url = some.router.url.split('/');
  }

  ngOnInit() {

  }

  openModal() {
    const modalRef = this.modalService.show(EventocuComponent, {
      class: 'modal-lg',
      initialState: {
        title: 'Crear nuevo evento',
      }
    });

    modalRef.content.action.subscribe(() => {
      this.listaEventos();
    });
  }

  listaEventos() {
    const tipo = JSON.parse(localStorage.getItem('usuario'));
    if (tipo.rol === 'CLIENT') {

      this._eventoService.getEventosByOwner(tipo._id).subscribe(
        (res: any) => {

          this.eventos = res.data;
          this.tempEventos = res.data;
        },

        error => {
          const toast = SWALCONFIG_TOAST;
          toast.title = 'Error al obtener eventos';
          toast.type = 'error';

        });
    } else {
      this._eventoService.getEventos().subscribe(
        (res: any) => {
          this.tempEventos = res.data;
          this.eventos = res.data;
        },

        error => {
          const toast = SWALCONFIG_TOAST;
          toast.title = 'Error al obtener eventos';
          toast.type = 'error';
        }
      );
    }
  }
}
