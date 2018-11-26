import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import swal from "sweetalert2";
import { map } from "rxjs/operators";
import { Conferencia } from "src/app/models/conferencia.model";

@Injectable({
  providedIn: "root"
})
export class ConferenciaService {
  constructor(public http: HttpClient, public router: Router) {}

  getConferencias(id) {
    let url = URL_SERVICIOS + "/conferencia/lista/"+id;

    return this.http.get(url);
  }

  crearConferencia(conferencia: Conferencia){
    let url = URL_SERVICIOS + '/conferencia';

    return this.http.post(url, conferencia).pipe(map((resp: any) =>{
      
      swal('Usuario correo', 'Se creó correctamente el usuario', 'success');
      return resp;

    }));
  }

  getConferenciaById(id){
    console.log(id);
    
    let url = URL_SERVICIOS + '/conferencia/'+id;
    return this.http.get(url);
  }
}
