import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService, EventoService } from 'src/app/services/service.index';
import { AlertMessages } from 'src/app/config/alert-messages';
import swal from 'sweetalert2';
import { SWALCONFIG_CONFIRMDELETE } from 'src/app/config/config';

@Component({
  selector: 'app-nuevomensaje',
  templateUrl: './nuevomensaje.component.html',
  styleUrls: ['./nuevomensaje.component.css']
})
export class NuevomensajeComponent implements OnInit, OnDestroy {
  @Output()
  action = new EventEmitter();

  mensajeForm: FormGroup;
  dataModal: any;
  clientes: any[] = [];
  dateNow = new Date();

  constructor(public modalRef: BsModalRef,
    public modalService: BsModalService,
    private api: UsuarioService,
    private eventoService: EventoService) {

    this.dataModal = modalService.config.initialState;

    this.mensajeForm = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      cliente: new FormControl(null, [Validators.required]),
      cuerpo: new FormControl(null, Validators.required)
    });

    this.getClientes();
  }

  ngOnInit() {
    if (this.dataModal.data) {

      this.mensajeForm.get('titulo').setValue(this.dataModal.data.titulo);
      this.mensajeForm.get('cliente').setValue(this.dataModal.data.tocliente);
      this.mensajeForm.get('cuerpo').setValue(this.dataModal.data.cuerpo);
      this.mensajeForm.get('cliente').disable();
    }
  }

  ngOnDestroy(): void {
    this.cerrar();
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
    const confirm = SWALCONFIG_CONFIRMDELETE;
    confirm.text = 'Se enviará el mensaje al cliente';
    swal(confirm).then(resp => {
      if (resp.value) {
        this.eventoService.sendMessage(this.mensajeForm.value).subscribe(
          res => {
            this.modalRef.hide();
            AlertMessages.showToast('Mensaje enviado correctamente', '', 3000, 'success');
            this.action.emit(true);
          },
          error => {
            AlertMessages.showToast(error, 'Error', 3000, 'error');
          }
        );
      }
    }).catch(err => { AlertMessages.showToast('Error al elegir opción', '', 3000, 'error'); });

  }

  cerrar() {
    if (!this.api.tipoLogin()) {
      this.action.emit(true);
      this.modalRef.hide();
    } else {
      this.modalRef.hide();
    }
  }

}
