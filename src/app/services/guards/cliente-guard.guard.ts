import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class ClienteGuardGuard implements CanActivate {

  constructor(private router: Router, public _usuarioService: UsuarioService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this._usuarioService.tipoLogin()) {
      return true;
    } else {
      // console.log('Bloqueado por el guard');
      this.router.navigate(['/eventos']);
      return false;
    }
  }
}
