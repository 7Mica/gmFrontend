import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../sidebar/sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menu: any = [];
  constructor(public _sidebar: SidebarService, private usuarioService: UsuarioService) {
    
    if(this.usuarioService.tipoLogin()){
      this.menu = this._sidebar.menuAdmin;
    }else{
      this.menu = this._sidebar.menuCliente;
    }
   }

  ngOnInit() {
  }

}
