import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { LoginGuardGuard } from "../services/service.index";
import { EventosComponent } from "./eventos/eventos.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { MenuclienteComponent } from "./menucliente/menucliente.component";
import { UsuariosComponent as UsuariosCliente } from "./menucliente/usuarios/usuarios.component";
import { ConferenciasComponent } from "./menucliente/conferencias/conferencias.component";
import { EstadisticasComponent } from "./menucliente/estadisticas/estadisticas.component";
import { MapasComponent } from "./menucliente/mapas/mapas.component";
import { MarcasComponent } from "./menucliente/marcas/marcas.component";
import { PaseentradaComponent } from "./menucliente/paseentrada/paseentrada.component";
import { ConstanciasComponent } from "./menucliente/constancias/constancias.component";
import { ClienteGuardGuard } from "../services/guards/cliente-guard.guard";

const pagesRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [ClienteGuardGuard],
        data: { titulo: "Dashboard" }
      },
      {
        path: "progress",
        component: ProgressComponent,
        canActivate: [ClienteGuardGuard],
        data: { titulo: "Progress bar" }
      },
      {
        path: "graficas1",
        component: Graficas1Component,
        canActivate: [ClienteGuardGuard],
        data: { titulo: "Graficas" }
      },
      {
        path: "usuarios",
        component: UsuariosComponent,
        canActivate: [ClienteGuardGuard],
        data: { titulo: "Usuarios" }
      },
      {
        path: "account-settings",
        component: AccountSettingsComponent,
        canActivate: [ClienteGuardGuard],
        data: { titulo: "Ajustes de cuenta" }
      },
      {
        path: "eventos",
        component: EventosComponent,
        data: { titulo: "Eventos" },
        children: [
          {
            path: ":idevento",
            component: MenuclienteComponent,
            data: { titulo: "Menu Cliente", breadcrumb: "menucliente" }
          },
          {
            path: ":idevento/usuarios",
            component: UsuariosCliente,
            data: { titulo: "Usuario Cliente", breadcrumb: "usuarios" }
          },
          {
            path: ":idevento/estadisticas",
            component: EstadisticasComponent,
            data: { titulo: "Estadísticas", breadcrumb: "estadisticas" }
          },
          {
            path: ":idevento/conferencias",
            component: ConferenciasComponent,
            data: { titulo: "Conferencias", breadcrumb: "conferencias" }
          },
          {
            path: ":idevento/mapas",
            component: MapasComponent,
            data: { titulo: "Mapas", breadcrumb: "mapas" }
          },
          {
            path: ":idevento/marcas",
            component: MarcasComponent,
            data: { titulo: "Marcas", breadcrumb: "marcas" }
          },
          {
            path: ":idevento/paseentrada",
            component: PaseentradaComponent,
            data: { titulo: "Pase de entrada", breadcrumb: "paseentrada" }
          },
          {
            path: ":idevento/constancias",
            component: ConstanciasComponent,
            data: { titulo: "Constancias", breadcrumb: "constancias" }
          },

          {
            path: "",
            pathMatch: "full",
            redirectTo: "/eventos"
          },
          {
            path: "**",
            pathMatch: "full",
            redirectTo: "/eventos"
          }
        ]
      },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
