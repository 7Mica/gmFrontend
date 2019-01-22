import { Routes, RouterModule } from '@angular/router';

import * as PagesIndex from '../config/pages.index';
import { ClienteGuardGuard } from '../services/guards/cliente-guard.guard';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesIndex.PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: 'dashboard',
        component: PagesIndex.DashboardComponent,
        canActivate: [ClienteGuardGuard],
        data: { titulo: 'Centro de información' }
      },
      {
        path: 'usuarios',
        component: PagesIndex.UsuariosComponent,
        canActivate: [ClienteGuardGuard],
        data: { titulo: 'Usuarios' }
      },
      // {
      //   path: 'papelera',
      //   component: PagesIndex.PapeleraComponent,
      //   canActivate: [ClienteGuardGuard],
      //   data: { titulo: 'Papelera' }
      // },
      // {
      //   path: 'editar-portal',
      //   component: PagesIndex.EdicionPortalComponent,
      //   canActivate: [ClienteGuardGuard],
      //   data: { titulo: 'Editar Portal' }
      // },
      {
        path: 'mensajes',
        component: PagesIndex.MensajesComponent,
        data: { titulo: 'Mensajes' }
      },
      {
        path: 'account-settings',
        component: PagesIndex.AccountSettingsComponent,
        canActivate: [ClienteGuardGuard],
        data: { titulo: 'Ajustes de cuenta' }
      },
      {
        path: 'eventos',
        component: PagesIndex.EventosComponent,
        data: { titulo: 'Eventos' },
        children: [
          {
            path: ':idevento',
            component: PagesIndex.MenuclienteComponent,
            data: { titulo: 'Menu Cliente', breadcrumb: 'menucliente' }
          },
          {
            path: ':idevento/usuarios',
            component: PagesIndex.UsuariosCliente,
            data: { titulo: 'Usuario Cliente', breadcrumb: 'usuarios' }
          },
          {
            path: ':idevento/estadisticas',
            component: PagesIndex.EstadisticasComponent,
            data: { titulo: 'Estadísticas', breadcrumb: 'estadisticas' }
          },
          {
            path: ':idevento/conferencias',
            component: PagesIndex.ConferenciasComponent,
            data: { titulo: 'Conferencias', breadcrumb: 'conferencias' }
          },
          {
            path: ':idevento/mapas',
            component: PagesIndex.MapasComponent,
            data: { titulo: 'Mapas', breadcrumb: 'mapas' }
          },
          {
            path: ':idevento/marcas',
            component: PagesIndex.MarcasComponent,
            data: { titulo: 'Marcas', breadcrumb: 'marcas' }
          },
          {
            path: ':idevento/paseentrada',
            component: PagesIndex.PaseentradaComponent,
            data: { titulo: 'Pase de entrada', breadcrumb: 'paseentrada' }
          },
          {
            path: ':idevento/constancias',
            component: PagesIndex.ConstanciasComponent,
            data: { titulo: 'Constancias', breadcrumb: 'constancias' }
          },

          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/eventos'
          },
          {
            path: '**',
            pathMatch: 'full',
            redirectTo: '/eventos'
          }
        ]
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
