/*******************
 * ANGULAR MODULES *
 *******************/

import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";

/***********************
 * THIRD PARTY MODULES *
 ***********************/

import { DataTableModule } from "angular2-datatable";
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

/**********
 * ROUTES *
 **********/

import { PAGES_ROUTES } from "./pages.routes";

/*************************
 * MODULO DE COMPONENTES *
 *************************/

 import { SharedModule } from "../shared/shared.module";

/*******************
 * PAGES COMPONENT *
 *******************/

import * as PagesIndex from "../config/pages.index";


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
    ],
    exports: [
        PagesIndex.DashboardComponent,

    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        DataTableModule,
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyC-78ipSk2R-phjUHRzEdXvnF0Gh7TD4CE'
          }),
        ModalModule.forRoot(),
        Ng2SmartTableModule
    ],

    entryComponents: [
        PagesIndex.UsuarioscuComponent,
        PagesIndex.EventocuComponent,
        PagesIndex.UsuariocComponent,
        PagesIndex.ConferenciacuComponent,
        PagesIndex.DetalleconferenciaComponent,
        PagesIndex.MarcascuComponent,
    ],

    providers: [
        
    ]
})

export class PagesModule {

}