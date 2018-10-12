import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {

   
  }

  ingresar(form: NgForm){
    if(form.invalid){
      return;
    }

    let usuario = new Usuario(form.value.email, form.value.password);

    this._usuarioService.login(usuario, form.value.recuerdame).subscribe(resp =>{

      console.log(resp);
      

    }, error => {

    });


    
    
  }

}
