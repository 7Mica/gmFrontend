import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import { Evento } from "src/app/models/evento.model";
import { map } from "rxjs/operators";
import swal from "sweetalert2";
import { Marca } from "src/app/models/marca.model";

@Injectable({
  providedIn: "root"
})
export class EventoService {
  constructor(public http: HttpClient) {}

  getEventos() {
    let url = URL_SERVICIOS + "/evento";

    return this.http.get(url);
  }

  removeEvento(id){
    let url = URL_SERVICIOS + "/evento/"+id;
    return this.http.delete(url);
  }

  getEventosByOwner(idcliente) {
    let url = URL_SERVICIOS + "/evento/byowner/"+idcliente;

    return this.http.get(url);
  }

  crearEvento(evento: Evento) {
    let url = URL_SERVICIOS + "/evento";

    return this.http.post(url, evento).pipe(
      map((resp: any) => {
        swal("Usuario correo", "Se creó correctamente el usuario", "success");
        return resp;
      })
    );
  }

  getEventoById(id) {
    let url = URL_SERVICIOS + "/evento/" + id;
    return this.http.get(url);
  }

/******************
 * TODO REFERENTE *
 *    A MARCAS    *
 ******************/

 newMarca(id, marca: Marca){
  let url = URL_SERVICIOS + "/evento/marcas/" + id;

  return this.http.post(url, marca).pipe(
    map((resp: any)=> {
      swal("Usuario correo", "Se creó correctamente la marca", "success");
        return resp;
    })
  );
 }

 getMarcasByEvento(id){
   let url = URL_SERVICIOS + "/evento/marcas/lista/"+id;

   return this.http.get(url);
 }

/******************
 * TODO REFERENTE *
 *    A MAPAS     *
 ******************/

/**
 * Nueva locación
 * @param idevento id del evento donde se guardará el mapa
 * @param coords Coordenas {lat: , lng: }
 */
 newLocation(idevento, coords){
  let url = URL_SERVICIOS + "/evento/mapas/"+idevento;

  return this.http.post(url, coords);
 }

 getLocation(idevento){
   let url = URL_SERVICIOS + "/evento/mapas/"+idevento;

   return this.http.get(url);
 }
}
