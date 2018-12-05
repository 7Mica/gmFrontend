import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class PasesService {

  constructor(private http: HttpClient,
    private router: Router) { }

    mandarPases(data) {
      const url = URL_SERVICIOS + '/pases/invitaciones';
      return this.http.post(url, data);
    }

    editarPase(data) {
      const url = URL_SERVICIOS + '/pases';
      return this.http.post(url, data);
    }

    getPaseByEventoId(idevento) {
      const url = URL_SERVICIOS + '/pases/' + idevento;
      return this.http.get(url);
    }
}
