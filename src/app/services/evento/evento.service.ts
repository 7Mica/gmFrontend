import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Evento } from 'src/app/models/evento.model';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(public http: HttpClient) { }

  getEventos(){
    let url = URL_SERVICIOS + '/evento';

    return this.http.get(url);
  }

  crearEvento(evento: Evento){
    let url = URL_SERVICIOS + '/evento';

    return this.http.post(url, evento).pipe(map((resp: any) =>{
      
      swal('Usuario correo', 'Se creó correctamente el usuario', 'success');
      return resp;

    }));
  }
}
