import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: string = '';
  constructor(private _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.infoUsuarioActual().nombre;
   }

  ngOnInit() {
  }

  cerrarSesion(){

    this._usuarioService.logout();

  }

}
