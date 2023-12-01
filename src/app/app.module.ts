import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './shared/header/header.component';
import {ToastsComponent} from "./shared/toasts/toasts.component";
import { ProfileComponent } from './user/profile/profile.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ToastsComponent,
        ProfileComponent

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
