import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, filter } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  constructor(public http: HttpClient) { }

  getEventos() {
    const url = URL_SERVICIOS + '/evento';

    return this.http.get(url).pipe(map((item: any) => {
      // tslint:disable-next-line:prefer-const
      let temp = item;
      temp.data = item.data.filter(evento => evento.cliente);
      return temp;
    }));
  }

  updateEvento(id, data) {
    const url = URL_SERVICIOS + '/evento/' + id;
    return this.http.put(url, data);
  }

  removeEvento(id) {
    const url = URL_SERVICIOS + '/evento/' + id;
    return this.http.delete(url);
  }

  getEventosByOwner(idcliente) {
    const url = URL_SERVICIOS + '/evento/byowner/' + idcliente;

    return this.http.get(url);
  }

  crearEvento(evento) {
    const url = URL_SERVICIOS + '/evento';

    return this.http.post(url, evento).pipe(
      map((resp: any) => {
        swal('Usuario correo', 'Se creó correctamente el usuario', 'success');
        return resp;
      })
    );
  }

  getEventoById(id) {
    const url = URL_SERVICIOS + '/evento/' + id;
    return this.http.get(url);
  }

  /******************
   * TODO REFERENTE *
   *    A MARCAS    *
   ******************/

  newMarca(id, marca) {
    const url = URL_SERVICIOS + '/evento/marcas/' + id;

    return this.http.post(url, marca);
  }

  deleteMarca(id) {
    const url = URL_SERVICIOS + '/evento/marcas/' + id;

    return this.http.delete(url);
  }

  updateMarcaById(idmarca, data) {
    const url = URL_SERVICIOS + '/evento/marcas/' + idmarca;

    return this.http.put(url, data);
  }

  getMarcaById(id) {
    const url = URL_SERVICIOS + '/evento/marcas/' + id;
    return this.http.get(url);
  }

  getMarcasByEvento(id) {
    const url = URL_SERVICIOS + '/evento/marcas/lista/' + id;

    return this.http.get(url);
  }

  /******************
   * TODO REFERENTE *
   *    A MAPAS     *
   ******************/

  saveCroquis(croquis) {
    const url = URL_SERVICIOS + '/evento/mapas/croquis';
    return this.http.post(url, croquis);
  }
  /**
   * Nueva locación
   * @param idevento id del evento donde se guardará el mapa
   * @param coords Coordenas {lat: , lng: }
   */
  newLocation(idevento, coords) {
    const url = URL_SERVICIOS + '/evento/mapas/' + idevento;

    return this.http.post(url, coords);
  }

  getLocation(idevento) {
    const url = URL_SERVICIOS + '/evento/mapas/' + idevento;

    return this.http.get(url);
  }

/********************************
 * TODO REFERENTE A CONSTANCIAS *
 ********************************/

  saveConstancia(data) {
    const url = URL_SERVICIOS + '/constancias';
    return this.http.post(url, data);
  }

  getConstancia(idevento) {
    const url = URL_SERVICIOS + '/constancias/' + idevento;
    return this.http.get(url);
  }

  generarConstancias(data) {
    const url = URL_SERVICIOS + '/constancias/generate';
    return this.http.post(url, data);
  }
}
