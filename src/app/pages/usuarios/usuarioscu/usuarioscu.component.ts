import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder
} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UsuarioService } from 'src/app/services/service.index';
import { SWALCONFIG_TOAST } from 'src/app/config/config';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarioscu',
  templateUrl: './usuarioscu.component.html',
  styleUrls: ['./usuarioscu.component.css']
})
export class UsuarioscuComponent implements OnInit {
  @Output()
  action = new EventEmitter();
  imagen: File;
  data: any;
  forma: FormGroup;
  prefs = [
    { name: 'Adminsitrador', value: 'ADMIN_ROLE' },
    { name: 'Cliente', value: 'CLIENT' }
  ];
  isEdit = false;

  constructor(
    public modalRef: BsModalRef,
    public modalService: BsModalService,
    public _usuarioService: UsuarioService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.forma = this.formBuilder.group(
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
          console.log(res);

          this.isEdit = true;
          this.forma.get('email').disable();
          this.forma.get('emailconfirm').disable();
          this.forma.get('password').disable();
          this.forma.get('passwordconfirm').disable();

          this.forma.get('nombre').setValue(res.data.nombre);
          this.forma.get('appaterno').setValue(res.data.apellidoPaterno);
          this.forma.get('apmaterno').setValue(res.data.apellidoMaterno);
          this.forma.get('calle').setValue((res.data.direccion) ? res.data.direccion.calle : '');
          this.forma.get('estado').setValue((res.data.direccion) ? res.data.direccion.estado : '');
          this.forma.get('ciudad').setValue((res.data.direccion) ? res.data.direccion.ciudad : '');
          this.forma.get('codigopostal').setValue((res.data.direccion) ? res.data.direccion.cp : '');
          this.forma.get('colonia').setValue((res.data.direccion) ? res.data.direccion.colonia : '');
          this.forma.get('numeroexterior').setValue((res.data.direccion) ? res.data.direccion.numeroExterior : '');
          this.forma.get('numerointerior').setValue((res.data.direccion) ? res.data.direccion.numeroInterior : '');
          this.forma.get('rol').setValue(res.data.rol);
        },
        error => {
          console.log(error);
        }
      );
    }
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

  uploadDocument(archivo: File) {
    if (!archivo) {
      this.imagen = null;
      return;
    }
    this.imagen = archivo;
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

    const uploadData = new FormData();
    uploadData.append('nombre', this.forma.get('nombre').value);
    uploadData.append('email', this.forma.get('email').value);
    uploadData.append('appaterno', this.forma.get('appaterno').value);
    uploadData.append('apmaterno', this.forma.get('apmaterno').value);
    uploadData.append('calle', this.forma.get('calle').value);
    uploadData.append('estado', this.forma.get('estado').value);
    uploadData.append('ciudad', this.forma.get('ciudad').value);
    uploadData.append('codigopostal', this.forma.get('codigopostal').value);
    uploadData.append('colonia', this.forma.get('colonia').value);
    uploadData.append('numeroexterior', this.forma.get('numeroexterior').value);
    uploadData.append('numerointerior', this.forma.get('numerointerior').value);
    uploadData.append('rol', this.forma.get('rol').value);
    uploadData.append('password', this.forma.get('password').value);
    if (this.imagen) {
      uploadData.append('img', this.imagen, this.imagen.name);
    } else {
      uploadData.append('img', null);
    }

    const toast: any = SWALCONFIG_TOAST;
    this._usuarioService.actualizarUsuario(id, uploadData).subscribe(
      res => {
        toast.title = 'Se actualizó el registro';
        toast.type = 'success';
        swal(toast);
        this.action.emit();
        this.modalRef.hide();
      },
      error => {
        console.log(error);
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

    const uploadData = new FormData();
    uploadData.append('nombre', this.forma.get('nombre').value);
    uploadData.append('email', this.forma.get('email').value);
    uploadData.append('appaterno', this.forma.get('appaterno').value);
    uploadData.append('apmaterno', this.forma.get('apmaterno').value);
    uploadData.append('calle', this.forma.get('calle').value);
    uploadData.append('estado', this.forma.get('estado').value);
    uploadData.append('ciudad', this.forma.get('ciudad').value);
    uploadData.append('codigopostal', this.forma.get('codigopostal').value);
    uploadData.append('colonia', this.forma.get('colonia').value);
    uploadData.append('numeroexterior', this.forma.get('numeroexterior').value);
    uploadData.append('numerointerior', this.forma.get('numerointerior').value);
    uploadData.append('rol', this.forma.get('rol').value);
    uploadData.append('password', this.forma.get('password').value);
    if (this.imagen) {
      uploadData.append('img', this.imagen, this.imagen.name);
    } else {
      uploadData.append('img', null);
    }
    this._usuarioService.crearUsuario(uploadData).subscribe(
      res => {
        const toast = SWALCONFIG_TOAST;
        toast.type = 'success';
        toast.title = 'Usuario creado correctamente';
        swal(toast);
        this.action.emit();
        this.modalRef.hide();
      },
      error => {
        console.log(error);
      }
    );
  }
}
