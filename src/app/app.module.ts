import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap';


// Rutas
import { APP_ROUTES } from './app.routes';

//Modulos 
import { PagesModule } from "./pages/pages.module";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './login/register.component';
import { PortalComponent } from './portal/portal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PortalComponent,
    
    
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
