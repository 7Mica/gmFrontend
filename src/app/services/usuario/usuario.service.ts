import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from "rxjs/operators";
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient, public router: Router) {
    console.log('Hola sevicio');
  }

  estaLogueado(){
    if(localStorage.getItem('token')){
      return true
    }else {
      return false
    }
  }

  logout(){
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recordar: boolean = false){
    let url = URL_SERVICIOS+'/login';

    if(recordar){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }
    return this.http.post(url, usuario).pipe(map((res: any)=> {
      
      localStorage.setItem('id', res.id);
      localStorage.setItem('token', res.token);
      localStorage.setItem('usuario', JSON.stringify(res.usuario));
      console.log(res);

      return true;
    }));
  }

  crearUsuario(usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe(map((resp: any) =>{
      
      swal('Usuario correo', 'Se creó correctamente el usuario', 'success');
      return resp;

    }));

  }

  listaUsuarios(){
    let url = URL_SERVICIOS + '/usuario';

    return this.http.get(url);
  }



  
}
