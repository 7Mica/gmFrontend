import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menuAdmin: any = [
    {
      titulo: 'Dashboard',
      icono: 'material-icons',
      url: '/dashboard'
    },
    {
      titulo: 'Eventos',
      icono: 'material-icons',
      url: '/eventos'
    },
    {
      titulo: 'Usuarios',
      icono: 'material-icons',
      url: '/usuarios'
    },
    {
      titulo: 'Mensajes',
      icono: 'material-icons',
      url: '/mensajes'
    },
    {
      titulo: 'Portal',
      icono: 'material-icons',
      url: '/portal'
    },
    {
      titulo: 'Papelera',
      icono: 'material-icons',
      url: '/papelera'
    }
  ];

  menuCliente: any =[
    {
      titulo: 'Eventos',
      icono: 'material-icons',
      url: '/eventos'
    }
  ];

  constructor() { }

}
