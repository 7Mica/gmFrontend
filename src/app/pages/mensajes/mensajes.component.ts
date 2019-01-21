import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NuevomensajeComponent } from './nuevomensaje/nuevomensaje.component';
import { EventoService, UsuarioService } from 'src/app/services/service.index';
import { switchMap, flatMap, concatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { AlertMessages } from 'src/app/config/alert-messages';


@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  usuario: any;
  modalRef: BsModalRef;
  mensajes: any[] = [];

  constructor(private modalService: BsModalService,
    private eventoService: EventoService,
    public usuarioService: UsuarioService) {

    if (this.usuarioService.tipoLogin()) {
      this.getMessages();
    } else {
      this.getMessageByCliente(this.usuarioService.infoUsuarioActual()._id);
    }
  }

  ngOnInit() {
  }

  getMessageByCliente(cliente) {
    this.eventoService.getMessageByCliente(cliente).subscribe(
      (res: any) => {
        this.mensajes = res.data;
      },
      error => {

      }
    );
  }

  nuevoMensaje() {
    const modalRef = this.modalService.show(NuevomensajeComponent, {
      class: 'modal-lg',
      initialState: {
        title: 'Nuevo mensaje'
      }
    });

    modalRef.content.action.subscribe((emmited: boolean) => {
      if (emmited) this.getMessages();
    });
  }

  abrirMensaje(mensaje: any) {
    console.log(mensaje);

    const modalRef = this.modalService.show(NuevomensajeComponent, {
      class: 'modal-lg',
      initialState: {
        title: 'Mensaje Seleccionado',
        data: mensaje
      }
    });

    modalRef.content.action.pipe(
      concatMap(resu => this.eventoService.messageReaded(mensaje._id)),
      concatMap(k => this.eventoService.getMessageByCliente(this.usuarioService.infoUsuarioActual()._id))
    ).subscribe(
      (res: any) => {
        this.mensajes = res.data;
      },
      error => {
        AlertMessages.showToast('Ocurrió un error en la petición', '', 3000, 'error');
      }
    );

  }

  getMessages() {
    this.eventoService.getMessages().subscribe(
      (res: any) => {
        this.mensajes = res.data;
      },

      error => {

      });
  }

}
