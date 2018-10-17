import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }
  constructor(@Inject (DOCUMENT) private _document) { 
    this.cargarAjustes();
  }

  /**
   * Guardar en local Storage
   * Sección 7-60
   */
  guardarAjustes(){
    // console.log('guardado en local storage');
    //localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes(){
    if(localStorage.getItem('ajustes')){
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
      // console.log('Cargando de local storage...');
    }else{
      // console.log('usando tema por defecto');
      this.aplicarTema(this.ajustes.tema);
    }
  }
  //Descomentar la linea de abajoo para buscar el id tema
  aplicarTema(tema: string){
    let url = `assets/css/colors/${tema}.css`
    //this._document.getElementById('tema').setAttribute('href', url );

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}