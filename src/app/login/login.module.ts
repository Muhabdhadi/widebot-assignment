import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {CommonModule} from "@angular/common";
import {LoginRoutingModule} from "./login-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: []
})
export class LoginModule {}
