import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EventoService, UsuarioService } from 'src/app/services/service.index';
import { SWALCONFIG_TOAST } from 'src/app/config/config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-eventocu',
  templateUrl: './eventocu.component.html',
  styleUrls: ['./eventocu.component.css']
})
export class EventocuComponent implements OnInit {
  @Output()
  action = new EventEmitter();

  forma: FormGroup;
  data: any;

  clientes: any[] = [];

  titulo = '';

  constructor(
    public modalRef: BsModalRef,
    public modalService: BsModalService,
    private _eventoService: EventoService,
    private _usuarioService: UsuarioService
  ) {

    this.listaClientes();
    this.data = this.modalService.config.initialState;
    const titulo: any = this.modalService.config.initialState;
    this.titulo = titulo.title;

  }

  ngOnInit() {

    this.forma = new FormGroup(
      {
        titulo: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        descripcion: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(300)
        ]),
        telefono: new FormControl(null, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ]),
        telefonodos: new FormControl(null, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)]),

        cliente: new FormControl(null, [
          Validators.required]),

        fechainicio: new FormControl(null, [Validators.required]),
        fechadefinalizacion: new FormControl(null, [Validators.required]),

        img: new FormControl(null, []),

        calle: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        estado: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        ciudad: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        cp: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5)
        ]),
        colonia: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        numeroexterior: new FormControl(null, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ]),
        numerointerior: new FormControl(null, [
          Validators.maxLength(50),
        ]),

      }
    );

    if (this.data.idevento) {
      this.getEventoNSetValueToForm(this.data.idevento);

    }
  }

  queEs() {
    if (this._usuarioService.tipoLogin() === false) {
      this.forma.get('cliente').disable();
      return false;
    } else {
      return true;
    }
  }

  elegirAccion() {
    if (this.data.idevento) {
      this.actualizarEvento();
    } else {
      this.registrarEvento();
    }
  }

  actualizarEvento() {
    console.log(this.forma.value);
    this._eventoService.updateEvento(this.data.idevento, this.forma.value).subscribe(
      res => {
        const toast = SWALCONFIG_TOAST;
        toast.type = 'success';
        toast.title = 'Se actualizó el evento correctamente';
        swal(toast);

        this.action.emit();
        this.modalRef.hide();
      },

      error => {
        const toast = SWALCONFIG_TOAST;
        toast.type = 'error';
        toast.title = 'Ocurrió un error al actualizar el evento';
        swal(toast);

      }
    );

  }

  registrarEvento() {
    if (this.forma.invalid) {
      return;
    }

    // tslint:disable-next-line:prefer-const
    let toast = SWALCONFIG_TOAST;
    this._eventoService.crearEvento(this.forma.value).subscribe(
      res => {
        toast.title = 'Se creó el evento correctamente';
        swal(toast);

        this.action.emit();
        this.modalRef.hide();
      },
      error => {
        toast.title = 'Error al obtener los eventos';
        toast.type = 'error';
        swal(toast);
      }
    );
  }

  listaClientes() {
    this._usuarioService.listaUsuariosClientes().subscribe(
      (res: any) => {
        this.clientes = res.data;
      },
      error => {
        // tslint:disable-next-line:prefer-const
        let toast = SWALCONFIG_TOAST;
        toast.title = 'Error al obtener los eventos';
        toast.type = 'error';
        swal(toast);

      });
  }

  getEventoNSetValueToForm(idevento) {
    this._eventoService.getEventoById(idevento).subscribe(
      (res: any) => {

        this.forma.get('titulo').setValue(res.data.titulo);
        this.forma.get('descripcion').setValue(res.data.descripcion);
        this.forma.get('telefono').setValue(res.data.telefono);
        this.forma.get('telefonodos').setValue(res.data.telefonodos);
        this.forma.get('cliente').setValue(res.data.cliente._id);
        this.forma.get('fechainicio').setValue(new Date(res.data.fechainicio));
        this.forma.get('fechadefinalizacion').setValue(new Date(res.data.fechadefinalizacion));
        this.forma.get('calle').setValue(res.data.direccion.calle);
        this.forma.get('estado').setValue(res.data.direccion.estado);
        this.forma.get('ciudad').setValue(res.data.direccion.ciudad);
        this.forma.get('cp').setValue(res.data.direccion.cp);
        this.forma.get('colonia').setValue(res.data.direccion.colonia);
        this.forma.get('numeroexterior').setValue(res.data.direccion.numeroExterior);
        this.forma.get('numerointerior').setValue(res.data.direccion.numeroInterior);

      },

      error => {
        const toast = SWALCONFIG_TOAST;
        toast.type = 'error';
        toast.title = 'Error al editar el evento';
        swal(toast);
      }
    );
  }
}
