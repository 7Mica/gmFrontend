import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NuevomensajeComponent } from './nuevomensaje/nuevomensaje.component';


@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  usuario: any;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  nuevoMensaje() {
    const modalRef = this.modalService.show(NuevomensajeComponent, {
      class: 'modal-lg',
      initialState: {
        title: 'Nuevo mensaje'
      }
    });

    modalRef.content.action.subscribe(() => {
      console.log('cerrar');

    });
  }

}
