import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Usuario } from "src/app/models/usuarioevento.model";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class UsuarioeventoService {
  constructor(public http: HttpClient, public router: Router) {}

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuarioevento";

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal("Usuario correo", "Se creó correctamente el usuario", "success");
        return resp;
      })
    );
  }

  eliminarUsuario(id) {
    let url = URL_SERVICIOS + "/usuarioevento/" + id;

    return this.http.delete(url);
  }

  getPonentesPorEvento(id){
    let url = URL_SERVICIOS+'/usuarioevento/ponente/'+id;

    return this.http.get(url);
  }

  listaUsuarios(id) {
    let url = URL_SERVICIOS + "/usuarioevento/lista/" + id;

    return this.http.get(url);
  }

  getUsuarioById(id) {
    let url = URL_SERVICIOS + "/usuarioevento/" + id;

    return this.http.get(url);
  }
}
