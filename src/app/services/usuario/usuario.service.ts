import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { idLocale } from 'ngx-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient, public router: Router) {
    console.log('Hola sevicio');
  }

  infoUsuarioActual() {

    return JSON.parse(localStorage.getItem('usuario'));
  }

  estaLogueado() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  tipoLogin() {
    const tipo = JSON.parse(localStorage.getItem('usuario'));
    if (tipo.rol === 'CLIENT') {
      return false;
    } else {
      return true;
    }
  }

  login(usuario: Login, recordar: boolean = false) {
    const url = URL_SERVICIOS + '/login';

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(url, usuario).pipe(map((res: any) => {

      localStorage.setItem('id', res.id);
      localStorage.setItem('token', res.token);
      localStorage.setItem('usuario', JSON.stringify(res.usuario));
      console.log(res);

      return true;
    }));
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe(map((resp: any) => {

      swal('Usuario correo', 'Se creó correctamente el usuario', 'success');
      return resp;

    }));

  }

  actualizarUsuario(id, usuario: any) {
    const url = URL_SERVICIOS + '/usuario/' + id;

    return this.http.put(url, usuario);
  }


  eliminarUsuario(id) {
    const url = URL_SERVICIOS + '/usuario/' + id;

    return this.http.delete(url);
  }

  listaUsuarios() {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.get(url);
  }

  listaUsuariosClientes() {
    const url = URL_SERVICIOS + '/usuario/clientes/lista';

    return this.http.get(url);
  }

  getUsuarioById(id) {
    const url = URL_SERVICIOS + '/usuario/' + id;

    return this.http.get(url);
  }




}
