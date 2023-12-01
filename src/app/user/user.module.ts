import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {ProfileComponent} from "./profile/profile.component";
import {UserRoutingModule} from "./user-routing.module";

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        UserRoutingModule
    ]
})
export class UserModule {}
