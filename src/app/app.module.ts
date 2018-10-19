import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';



// Rutas
import { APP_ROUTES } from './app.routes';

//Modulos 
import { PagesModule } from "./pages/pages.module";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

//Servicios
import { ServiceModule } from './services/service.module';

import { RegisterComponent } from './login/register.component';
import { PortalComponent } from './portal/portal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { UsuarioscuComponent } from './usuarios/usuarioscu/usuarioscu.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PortalComponent,
    UsuarioscuComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ServiceModule,
    SharedModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
