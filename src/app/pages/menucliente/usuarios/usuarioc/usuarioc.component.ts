import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  AbstractControl
} from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { UsuarioeventoService, EventoService } from "src/app/services/service.index";
import { UsuarioEvento } from "src/app/models/usuarioevento.model";
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";
import { SWALCONFIG_TOAST } from "src/app/config/config";

@Component({
  selector: "app-usuarioc",
  templateUrl: "./usuarioc.component.html",
  styleUrls: ["./usuarioc.component.css"]
})
export class UsuariocComponent implements OnInit {
  @Output()
  action = new EventEmitter();

  data: any;
  forma: FormGroup;
  ponente: boolean = false;
  prefs = [
    { name: "Adminsitrador", value: "ADMIN_ROLE" },
    { name: "Usuario", value: "USER_ROLE" },
    { name: "Staff", value: "STAFF" },
    { name: "Ponente", value: "PONENTE" },
    { name: "Stand", value: "STAND" }
  ];

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
          console.log(res);
          
          this.forma.get("nombre").setValue(res.data.nombre);
          this.forma.get("appaterno").setValue(res.data.apellidoPaterno);
          this.forma.get("apmaterno").setValue(res.data.apellidoMaterno);
          this.forma.get("email").setValue(res.data.email);
        },
        error => {
          let toast = SWALCONFIG_TOAST;
          toast.title = 'Error en la petición';
          toast.type = 'error';

          swal(toast);
        }
      );
    }
  }

  onChange(event){
    console.log(event.target.value);
    if(event.target.value === 'PONENTE'){
      this.forma.get('marca').enable();
      this.ponente = true;
    }else{
      this.forma.get('marca').setValue(null);
      this.forma.get('marca').disable();
      this.ponente = false;
      
    }
    
  }

  getMarcas(){
    console.log(this.data.idevento);
    
    this.eventoService.getMarcasByEvento(this.data.idevento).subscribe((res: any)=>{
      console.log(res);
      
      res.data.marcas.forEach(element => {
        this.marcas.push(element);
      });
      
    }, error => {

    });
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
    console.log(this.data);
    
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

    let usuario = new UsuarioEvento(
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
      this.data.idevento,
      this.forma.value.rol,
      this.forma.value.email,
      this.forma.value.password,
      this.forma.value.marca
    );

    console.log(usuario);

    this._usuarioService.crearUsuario(usuario).subscribe(
      res => {
        console.log(res);
        
        console.log("Usuario guardado");
        this.action.emit();
        this.modalRef.hide();
      },
      error => {
        swal("Error!", "Ocurrío un error: " + error, "error");
      }
    );
  }
}
