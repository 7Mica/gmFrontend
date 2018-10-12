import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService } from "./service.index";
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    
     ],

  declarations: []
})
export class ServiceModule { }
