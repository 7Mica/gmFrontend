import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService, Utils } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService, EventoService } from 'src/app/services/service.index';
import { AlertMessages } from 'src/app/config/alert-messages';

@Component({
  selector: 'app-nuevomensaje',
  templateUrl: './nuevomensaje.component.html',
  styleUrls: ['./nuevomensaje.component.css']
})
export class NuevomensajeComponent implements OnInit {
  @Output()
  action = new EventEmitter();

  mensajeForm: FormGroup;
  dataModal: any;
  clientes: any[] = [];

  constructor(public modalRef: BsModalRef,
    public modalService: BsModalService,
    private api: UsuarioService,
    private eventoService: EventoService) {

    this.dataModal = modalService.config.initialState;

    this.mensajeForm = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      cliente: new FormControl(null, [Validators.required]),
      cuerpomensaje: new FormControl(null, Validators.required)
    });

    this.getClientes();
  }

  ngOnInit() {
  }

  getClientes() {
    this.api.listaUsuariosClientes().subscribe(
      (res: any) => {
        this.clientes = res.data;

      },
      error => {
        AlertMessages.showToast('Ocurrió un error al obtener clientes', 'Error', 3000, 'error');

      }
    );

  }

  sendMessage() {
    this.eventoService.sendMessage(this.mensajeForm.value).subscribe(
      res => {
        AlertMessages.showToast('El mensaje ha sido enviado', '', 3000, 'success');
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }

  // this.action.emit();
  // this.modalRef.hide();
}
