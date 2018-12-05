import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  constructor(public _usuarioService: UsuarioService, public router: Router) { }

  sonIguales(campo1: string, campo2: string) {


    return (group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };

  }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      appaterno: new FormControl(null, [Validators.required]),
      apmaterno: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      emailconfirm: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      passwordconfirm: new FormControl(null, [Validators.required])

    });
    // }, {validators: [this.sonIguales('password', 'passwordconfirm'), this.sonIguales('email', 'emailconfirm')] });
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    this._usuarioService.crearUsuario(this.forma.value).subscribe(res => {

      console.log(res);

      // this.forma.setValue({
      //   nombre: '',
      //   appaterno: '',
      //   apmaterno: '',
      //   email: '',
      //   emailconfirm: '',
      //   password: '',
      //   passwordconfirm: ''
      // });

      this.router.navigate(['/login']);
    }, error => {
      console.log(error);


    });
  }


}
