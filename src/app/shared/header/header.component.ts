import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { IMAGEHOSTUSUARIO } from 'src/app/config/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: string;
  img: any;
  email: string;
  constructor(private _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.infoUsuarioActual().nombre;

    this.email = _usuarioService.infoUsuarioActual().email;
    this.img = IMAGEHOSTUSUARIO + _usuarioService.infoUsuarioActual().img;
  }

  ngOnInit() {
  }

  cerrarSesion() {

    this._usuarioService.logout();

  }

}
