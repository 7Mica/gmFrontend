import { NgModule } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
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