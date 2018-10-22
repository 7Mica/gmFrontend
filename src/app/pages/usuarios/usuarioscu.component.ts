import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-usuarioscu',
  templateUrl: './usuarioscu.component.html',
  styleUrls: ['./usuarioscu.component.css']
})
export class UsuarioscuComponent implements OnInit {

  forma: FormGroup;

  constructor(public modalRef: BsModalRef, public _usuarioService: UsuarioService) { 
  }

  matchEmail(AC: AbstractControl) {
    let email = AC.get('email').value; // to get value in input tag
    let confirmEmail = AC.get('emailconfirm').value; // to get value in input tag
     if(email != confirmEmail) {
         AC.get('emailconfirm').setErrors( {matchemail: true} )
     } else {
         console.log('true');
         return null
     }
 }

  matchPassword(AC: AbstractControl) {
  let password = AC.get('password').value; // to get value in input tag
  let confirmPassword = AC.get('passwordconfirm').value; // to get value in input tag
   if(password != confirmPassword) {
       AC.get('passwordconfirm').setErrors( {matchpassword: true} )
   } else {
       console.log('true');
       return null
   }
}

  ngOnInit() {

    this.forma = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      appaterno: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      apmaterno: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      emailconfirm: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      passwordconfirm: new FormControl(null, [Validators.required])

    }, {validators: [this.matchEmail, this.matchPassword] });
  }
  
  registrarUsuario(){
    if(this.forma.invalid){
      return;
    }

    

    let usuario = new Usuario(
      this.forma.value.email,
      this.forma.value.password,
      this.forma.value.nombre,
      this.forma.value.appaterno,
      this.forma.value.apmaterno

    );

    this._usuarioService.crearUsuario(usuario).subscribe(res => {

      console.log('Usuario guardado');
      this.forma.reset();
      this.modalRef.hide();
      

    }, error => {
      console.log(error);
      
    })

    
    
  }

}
