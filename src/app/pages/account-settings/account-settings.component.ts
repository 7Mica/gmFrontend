import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  //Acceder a elementos del DOM
  constructor(@Inject (DOCUMENT) private _document, public _ajustes: SettingsService) {
  
   }

  ngOnInit() {
  }
  /**
   * 
   * Cambiar el color del tema
   * Ejemplo para acceder al DOM del documento html de la aplicación.
   * No cambia el tema, es solo un ejemplo.
   * Sección 7 Udemy
   * Tambien se usa en 60
   */
  cambiarColor(tema: string, link: any){
    this.aplicarCheck(link);
    
    this._ajustes.aplicarTema(tema);
  }

  aplicarCheck(link: any){
    let selectores: any = document.getElementsByClassName('selector');
    for(let ref of selectores){
      ref.classList.remove('working');
    }
    link.classList.add('working')
  }

}
