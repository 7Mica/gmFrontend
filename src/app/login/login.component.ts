import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Login } from '../models/login.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {

    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1){
      this.recuerdame = true;
    }
   
  }

  ingresar(form: NgForm){
    if(form.invalid){
      return;
    }

    let usuario = new Login(form.value.email, form.value.password);

    this._usuarioService.login(usuario, form.value.recuerdame).subscribe(resp =>{

      this.router.navigate(['dashboard']);
      

    }, error => {

    });


    
    
  }

}
