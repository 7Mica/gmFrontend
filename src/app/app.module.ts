/*******************
 * ANGULAR MODULES *
 *******************/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/*********************
 * 3RD PARTY MODULES *
 *********************/

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ModalModule } from 'ngx-bootstrap';

/**********
 * ROUTES *
 **********/

import { APP_ROUTES } from './app.routes';

/*********************
 * COMPONENT MODULES *
 *********************/

import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { ServiceModule } from './services/service.module';

/**************
 * COMPONENTS *
 **************/
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
  exports: [],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ServiceModule,
    SharedModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    ModalModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
