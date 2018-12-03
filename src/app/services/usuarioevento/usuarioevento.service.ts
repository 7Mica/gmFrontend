import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioeventoService {
  constructor(public http: HttpClient, public router: Router) { }

  crearUsuario(usuario) {
    const url = URL_SERVICIOS + '/usuarioevento';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal('Usuario correo', 'Se creó correctamente el usuario', 'success');
        return resp;
      })
    );
  }

  eliminarUsuario(id) {
    const url = URL_SERVICIOS + '/usuarioevento/' + id;

    return this.http.delete(url);
  }

  getPonentesPorEvento(id) {
    const url = URL_SERVICIOS + '/usuarioevento/ponente/' + id;

    return this.http.get(url);
  }

  getCountById(idevento) {

    const url = URL_SERVICIOS + '/usuarioevento/count/' + idevento;

    return this.http.get(url);

  }

  actualizarUsuario(id, usuarioevento: any) {
    const url = URL_SERVICIOS + '/usuarioevento/' + id;

    return this.http.put(url, usuarioevento);
  }

  listaUsuarios(id) {
    const url = URL_SERVICIOS + '/usuarioevento/lista/' + id;

    return this.http.get(url);
  }

  getUsuarioById(id) {
    const url = URL_SERVICIOS + '/usuarioevento/' + id;

    return this.http.get(url);
  }
}
