import { Routes, RouterModule } from "@angular/router";


import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { LoginGuardGuard } from "../services/service.index";
import { EventosComponent } from "./eventos/eventos.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";

const pagesRoutes: Routes = [

    {
        path: '',
        component: PagesComponent, canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress bar'} },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'} },
            { path: 'eventos', component: EventosComponent, data: { titulo: 'Eventos'} },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
]

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);