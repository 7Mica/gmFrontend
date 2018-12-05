import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { HeaderComponent } from "./header/header.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
    imports: [
        RouterModule, 
        CommonModule
    ],
        
    declarations: [
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent,
        FooterComponent,

    ],
    exports: [
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent,
        FooterComponent,

    ]
})

export class SharedModule {

}