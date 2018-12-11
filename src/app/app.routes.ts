import { RouterModule, Routes } from '@angular/router';

import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PortalComponent } from './portal/portal.component';




const appRoutes: Routes = [

    { path: 'portal', component: PortalComponent },
    { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent },
    { path: '', redirectTo: 'portal', pathMatch: 'full' }
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, {
    useHash: true,
    anchorScrolling: 'enabled',

});
