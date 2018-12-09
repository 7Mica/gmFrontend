import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menuAdmin: any = [
    {
      titulo: 'Centro de información',
      icono: 'ti-dashboard',
      url: '/dashboard'
    },
    {
      titulo: 'Eventos',
      icono: 'ti-blackboard',
      url: '/eventos'
    },
    {
      titulo: 'Usuarios',
      icono: 'ti-user',
      url: '/usuarios'
    },
    {
      titulo: 'Mensajes',
      icono: 'ti-comment-alt',
      url: '/mensajes'
    },
    {
      titulo: 'Portal',
      icono: 'ti-layout-cta-btn-left',
      url: '/portal'
    },
    {
      titulo: 'Papelera',
      icono: 'ti-trash',
      url: '/papelera'
    }
  ];

  menuCliente: any = [
    {
      titulo: 'Eventos',
      icono: 'material-icons',
      url: '/eventos'
    }
  ];

  constructor() { }

}
