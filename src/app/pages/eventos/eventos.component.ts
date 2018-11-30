import { Component, OnInit } from '@angular/core';
import { EventoService, SharedService, UsuarioService } from 'src/app/services/service.index';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EventocuComponent } from './eventocu/eventocu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventos: any[] = [];
  modalRef: BsModalRef;
  menuActivado = false;
  evento = false;
  url = ['/eventos'];
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
    console.log(some);
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
        data: {}
      }
    });

    modalRef.content.action.take(1).subscribe(() => {
      this.eventos = [];
      this.listaEventos();
    });
  }

  listaEventos() {
    const tipo = JSON.parse(localStorage.getItem('usuario'));
    if (tipo.rol === 'CLIENT') {
      this.eventos = [];
      this._eventoService.getEventosByOwner(tipo._id).subscribe((res: any) => {
        res.data.forEach(element => {
          this.eventos.push(element);
        });
      }, error => {
        console.log(error);

      });
    } else {
      this._eventoService.getEventos().subscribe(
        (res: any) => {
          this.eventos = [];
          res.data.forEach(element => {
            this.eventos.push(element);
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
