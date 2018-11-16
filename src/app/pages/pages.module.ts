import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";

//Modulos 3ros
import {DataTableModule} from "angular2-datatable";
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';



//Pages
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { SharedModule } from "../shared/shared.module";
import { PAGES_ROUTES } from "./pages.routes";
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficaComponent } from "../components/grafica/grafica.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { EventosComponent } from './eventos/eventos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosComponent as UsuariosCliente } from './menucliente/usuarios/usuarios.component';
import { UsuarioscuComponent } from "./usuarios/usuarioscu/usuarioscu.component";
import { EventocuComponent } from './eventos/eventocu/eventocu.component';
import { MenuclienteComponent } from './menucliente/menucliente.component';
import { ConferenciasComponent } from './menucliente/conferencias/conferencias.component';
import { EstadisticasComponent } from './menucliente/estadisticas/estadisticas.component';
import { MapasComponent } from './menucliente/mapas/mapas.component';
import { MarcasComponent } from './menucliente/marcas/marcas.component';
import { PaseentradaComponent } from './menucliente/paseentrada/paseentrada.component';
import { ConstanciasComponent } from './menucliente/constancias/constancias.component';
import { UsuariocComponent } from './menucliente/usuarios/usuarioc/usuarioc.component';
import { ConferenciacuComponent } from './menucliente/conferencias/conferenciacu/conferenciacu.component';
import { DetalleconferenciaComponent } from './menucliente/modales/detalleconferencia/detalleconferencia.component';
import { MarcascuComponent } from './menucliente/marcas/marcascu/marcascu.component';

//temporal

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficaComponent,
        AccountSettingsComponent,
        EventosComponent,
        UsuariosComponent,
        UsuarioscuComponent,
        EventocuComponent,
        MenuclienteComponent,
        UsuariosCliente,
        ConferenciasComponent,
        EstadisticasComponent,
        MapasComponent,
        MarcasComponent,
        PaseentradaComponent,
        ConstanciasComponent,
        UsuariocComponent,
        ConferenciacuComponent,
        DetalleconferenciaComponent,
        MarcascuComponent,
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,

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
        UsuarioscuComponent,
        EventocuComponent,
        UsuariocComponent,
        ConferenciacuComponent,
        DetalleconferenciaComponent,
        MarcascuComponent,
    ],

    providers: [
        
    ]
})

export class PagesModule {

}