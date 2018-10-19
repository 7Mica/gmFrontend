import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { SharedModule } from "../shared/shared.module";
import { PAGES_ROUTES } from "./pages.routes";
import { ChartsModule } from 'ng2-charts';
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficaComponent } from "../components/grafica/grafica.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { EventosComponent } from './eventos/eventos.component';
import {DataTableModule} from "angular2-datatable";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioscuComponent } from "./usuarios/usuarioscu.component";

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
        UsuarioscuComponent
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
        ReactiveFormsModule
    ]
})

export class PagesModule {

}