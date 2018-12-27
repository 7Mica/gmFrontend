/*******************
 * ANGULAR MODULES *
 *******************/

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

/***********************
 * THIRD PARTY MODULES *
 ***********************/

import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorPickerModule } from 'ngx-color-picker';
import { QRCodeModule } from 'angularx-qrcode';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

/**********
 * ROUTES *
 **********/

import { PAGES_ROUTES } from './pages.routes';

/*************************
 * MODULO DE COMPONENTES *
 *************************/

import { SharedModule } from '../shared/shared.module';

/*******************
 * PAGES COMPONENT *
 *******************/

import * as PagesIndex from '../config/pages.index';
import { ChangePasswordComponent } from './menucliente/modales/change-password/change-password.component';

@NgModule({
    declarations: [
        PagesIndex.PagesComponent,
        PagesIndex.DashboardComponent,
        PagesIndex.AccountSettingsComponent,
        PagesIndex.EventosComponent,
        PagesIndex.UsuariosComponent,
        PagesIndex.UsuarioscuComponent,
        PagesIndex.EventocuComponent,
        PagesIndex.MenuclienteComponent,
        PagesIndex.UsuariosCliente,
        PagesIndex.ConferenciasComponent,
        PagesIndex.EstadisticasComponent,
        PagesIndex.MapasComponent,
        PagesIndex.MarcasComponent,
        PagesIndex.PaseentradaComponent,
        PagesIndex.ConstanciasComponent,
        PagesIndex.UsuariocComponent,
        PagesIndex.ConferenciacuComponent,
        PagesIndex.DetalleconferenciaComponent,
        PagesIndex.MarcascuComponent,
        ChangePasswordComponent,
        PagesIndex.MensajesComponent,
        PagesIndex.NuevomensajeComponent,
        PagesIndex.EdicionPortalComponent,
    ],
    exports: [
        PagesIndex.DashboardComponent,

    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyC-78ipSk2R-phjUHRzEdXvnF0Gh7TD4CE'
        }),
        ModalModule.forRoot(),
        Ng2SmartTableModule,
        NgSelectModule,
        ColorPickerModule,
        QRCodeModule,
        BsDatepickerModule.forRoot()
    ],

    entryComponents: [
        PagesIndex.UsuarioscuComponent,
        PagesIndex.EventocuComponent,
        PagesIndex.UsuariocComponent,
        PagesIndex.ConferenciacuComponent,
        PagesIndex.DetalleconferenciaComponent,
        PagesIndex.MarcascuComponent,
        PagesIndex.NuevomensajeComponent
    ],

    providers: [

    ]
})

export class PagesModule {

}
