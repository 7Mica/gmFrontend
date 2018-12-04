import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UsuarioeventoService, EventoService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { SWALCONFIG_TOAST } from 'src/app/config/config';

@Component({
  selector: 'app-usuarioc',
  templateUrl: './usuarioc.component.html',
  styleUrls: ['./usuarioc.component.css']
})
export class UsuariocComponent implements OnInit {
  @Output()
  action = new EventEmitter();

  data: any;
  forma: FormGroup;
  ponente = false;
  prefs = [
    { name: 'Adminsitrador', value: 'ADMIN_ROLE' },
    { name: 'Asistente', value: 'ASISTENTE' },
    { name: 'Staff', value: 'STAFF' },
    { name: 'Ponente', value: 'PONENTE' },
  ];

  isEdit = false;
  marcas: any[] = [];

  constructor(
    public modalRef: BsModalRef,
    public modalService: BsModalService,
    public _usuarioService: UsuarioeventoService,
    private activatedRoute: ActivatedRoute,
    private eventoService: EventoService
  ) {

  }

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    let data: any = this.modalService.config.initialState;
    this.data = data;
    this.getMarcas();

    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        appaterno: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        apmaterno: new FormControl(null, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
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
        codigopostal: new FormControl(null, [
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
          Validators.maxLength(50)
        ]),
        numerointerior: new FormControl(null, [Validators.maxLength(50)]),
        rol: new FormControl(null, [Validators.required]),
        marca: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        emailconfirm: new FormControl(null, [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(5)
        ]),
        passwordconfirm: new FormControl(null, [Validators.required])
      },
      { validators: [this.matchEmail, this.matchPassword] }
    );

    if (this.data.edit) {

      this._usuarioService.getUsuarioById(this.data._id).subscribe(
        (res: any) => {
          this.isEdit = true;
          this.forma.get('email').disable();
          this.forma.get('emailconfirm').disable();
          this.forma.get('password').disable();
          this.forma.get('passwordconfirm').disable();

          this.forma.get('nombre').setValue(res.data.nombre);
          this.forma.get('appaterno').setValue(res.data.apellidoPaterno);
          this.forma.get('apmaterno').setValue(res.data.apellidoMaterno);
          this.forma.get('calle').setValue(res.data.direccion.calle);
          this.forma.get('estado').setValue(res.data.direccion.estado);
          this.forma.get('ciudad').setValue(res.data.direccion.ciudad);
          this.forma.get('codigopostal').setValue(res.data.direccion.cp);
          this.forma.get('colonia').setValue(res.data.direccion.colonia);
          this.forma.get('numeroexterior').setValue(res.data.direccion.numeroExterior);
          this.forma.get('numerointerior').setValue(res.data.direccion.numeroInterior);
          this.forma.get('rol').setValue(res.data.rol);
          if (res.data.rol === 'PONENTE') {
            this.ponente = true;
            this.forma.get('marca').setValue(res.data.marcas);
            this.forma.get('marca').enable();
          } else {
            this.ponente = false;
            this.forma.get('marca').disable();
          }

        },
        error => {
          // tslint:disable-next-line:prefer-const
          let toast = SWALCONFIG_TOAST;
          toast.title = 'Error en la petición';
          toast.type = 'error';

          swal(toast);
        }
      );
    }
  }

  onChange(event) {
    console.log(event.target.value);
    if (event.target.value === 'PONENTE') {
      this.forma.get('marca').enable();
      this.ponente = true;
    } else {
      this.forma.get('marca').setValue(null);
      this.forma.get('marca').disable();
      this.ponente = false;

    }

  }

  getMarcas() {
    this.eventoService.getMarcasByEvento(this.data.idevento).subscribe((res: any) => {
      res.data.marcas.forEach(element => {
        this.marcas.push(element);
      });

    }, error => {

    });
  }

  matchEmail(AC: AbstractControl) {
    const email = AC.get('email').value; // to get value in input tag
    const confirmEmail = AC.get('emailconfirm').value; // to get value in input tag
    if (email !== confirmEmail) {
      AC.get('emailconfirm').setErrors({ matchemail: true });
    } else {
      return null;
    }
  }

  matchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('passwordconfirm').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('passwordconfirm').setErrors({ matchpassword: true });
    } else {
      return null;
    }
  }

  queEs() {
    if (this.data.edit) {
      this.actualizarUsuario(this.data._id);
    } else {
      this.registrarUsuario();
    }
  }

  actualizarUsuario(id) {
    if (this.forma.invalid) {

      return;
    }
    // tslint:disable-next-line:prefer-const
    let toast: any = SWALCONFIG_TOAST;
    // tslint:disable-next-line:prefer-const
    let usuarioevento = this.forma.value;
    usuarioevento.idevento = this.data.idevento;
    this._usuarioService.actualizarUsuario(id, usuarioevento).subscribe(
      res => {

        toast.title = 'Se actualizó el registro';
        swal(toast);
        this.action.emit();
        this.modalRef.hide();
      },
      error => {
        toast.title = 'Ocurrió un error en la petición';
        toast.type = 'error';
        swal(toast);

      }
    );
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    // tslint:disable-next-line:prefer-const
    let usuario = this.forma.value;
    usuario.evento = this.data.idevento;

    // tslint:disable-next-line:prefer-const
    let toast = SWALCONFIG_TOAST;
    this._usuarioService.crearUsuario(this.forma.value).subscribe(
      res => {
        toast.title = 'Usuario creado correctamente';
        swal(toast);
        this.action.emit();
        this.modalRef.hide();
      },
      error => {
        toast.title = 'Ocurrió algo con la petición';
        toast.type = 'error';
        swal(toast);
      }
    );
  }
}
