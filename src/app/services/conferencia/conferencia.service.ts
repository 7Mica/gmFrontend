import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import swal from 'sweetalert2';
import { map, filter } from 'rxjs/operators';
import { Conferencia } from 'src/app/models/conferencia.model';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ConferenciaService {
  constructor(public http: HttpClient, public router: Router) { }

  getConferencias(id) {
    const url = URL_SERVICIOS + '/conferencia/lista/' + id;

    return this.http.get(url).pipe(map((item: any) => {
      // tslint:disable-next-line:prefer-const
      let temp = item;
      temp.conferencias = item.conferencias.filter(conferencia => conferencia.ponente.marcas);
      return temp;
    }));

  }

  crearConferencia(conferencia: Conferencia) {
    const url = URL_SERVICIOS + '/conferencia';

    return this.http.post(url, conferencia).pipe(map((resp: any) => {

      swal('Usuario correo', 'Se creó correctamente el usuario', 'success');
      return resp;

    }));
  }

  getConferenciaById(id) {
    const url = URL_SERVICIOS + '/conferencia/' + id;
    return this.http.get(url);
  }

  eliminarConferencia(id) {
    const url = URL_SERVICIOS + '/conferencia/' + id;
    return this.http.delete(url);
  }
}
