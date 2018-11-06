import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/service.index";

@Component({
  selector: "app-usuarioscu",
  templateUrl: "./usuarioscu.component.html",
  styleUrls: ["./usuarioscu.component.css"]
})
export class UsuarioscuComponent implements OnInit {
  @Output()
  action = new EventEmitter();

  data: any;
  forma: FormGroup;
  prefs = [
    { name: "Adminsitrador", value: "ADMIN_ROLE" },
    { name: "Cliente", value: "CLIENT" }
  ];

  constructor(
    public modalRef: BsModalRef,
    public modalService: BsModalService,
    public _usuarioService: UsuarioService
  ) {}

  ngOnInit() {
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
        fechanacimiento: new FormControl(null, [Validators.required]),
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
        referencias: new FormControl(null, [
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

          this.forma.get("nombre").setValue(res.data.nombre);
          this.forma.get("appaterno").setValue(res.data.apellidoPaterno);
          this.forma.get("apmaterno").setValue(res.data.apellidoMaterno);
          this.forma.get("email").setValue(res.data.email);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  matchEmail(AC: AbstractControl) {
    let email = AC.get("email").value; // to get value in input tag
    let confirmEmail = AC.get("emailconfirm").value; // to get value in input tag
    if (email != confirmEmail) {
      AC.get("emailconfirm").setErrors({ matchemail: true });
    } else {
      return null;
    }
  }

  matchPassword(AC: AbstractControl) {
    let password = AC.get("password").value; // to get value in input tag
    let confirmPassword = AC.get("passwordconfirm").value; // to get value in input tag
    if (password != confirmPassword) {
      AC.get("passwordconfirm").setErrors({ matchpassword: true });
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
      console.log("No es valido");
    } else {
      console.log("entro");
    }
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.appaterno,
      this.forma.value.apmaterno,
      this.forma.value.fechanacimiento,
      this.forma.value.calle,
      this.forma.value.estado,
      this.forma.value.ciudad,
      this.forma.value.referencias,
      this.forma.value.codigopostal,
      this.forma.value.colonia,
      this.forma.value.numeroexterior,
      this.forma.value.numerointerior,
      this.forma.value.rol,
      this.forma.value.email,
      this.forma.value.password
    );

    console.log(usuario);

    this._usuarioService.crearUsuario(usuario).subscribe(
      res => {
        console.log("Usuario guardado");
        this.action.emit();
        this.modalRef.hide();
      },
      error => {
        console.log(error);
      }
    );
  }
}
