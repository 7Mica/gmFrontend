import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarioscu',
  templateUrl: './usuarioscu.component.html',
  styleUrls: ['./usuarioscu.component.css']
})
export class UsuarioscuComponent implements OnInit {

  forma: FormGroup;

  constructor() { }

  ngOnInit() {

    this.forma = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      appaterno: new FormControl(null, [Validators.required]),
      apmaterno: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      emailconfirm: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      passwordconfirm: new FormControl(null, [Validators.required])

    })
  }

}
