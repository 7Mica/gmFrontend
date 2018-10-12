import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from "rxjs/operators";
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient) {
    console.log('Hola sevicio');
  }

  login(usuario: Usuario, recordar: boolean = false){
    let url = URL_SERVICIOS+'/login';

    return this.http.post(url, usuario);
  }

  crearUsuario(usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe(map((resp: any) =>{
      
      swal('Usuario correo', 'Se creó correctamente el usuario', 'success');
      return resp;

    }));

  }



  
}
