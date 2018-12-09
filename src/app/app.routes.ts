import { RouterModule, Routes } from '@angular/router';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PortalComponent } from './portal/portal.component';
import { AboutComponent } from './portal/about/about.component';
import { ContactComponent } from './portal/contact/contact.component';
import { ServiciosComponent } from './portal/servicios/servicios.component';



const appRoutes: Routes = [

    { path: 'portal', component: PortalComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contacto', component: ContactComponent },
    { path: 'servicios', component: ServiciosComponent },
    // { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
