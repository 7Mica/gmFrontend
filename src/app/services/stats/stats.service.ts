import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  usuariosPorEventoStats() {
    const url = URL_SERVICIOS + '/stats/';
    return this.http.get(url);
  }
}
