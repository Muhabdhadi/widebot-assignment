import {NgModule} from "@angular/core";
import {AdminRoutingModule} from "./admin-routing.module";
import { UsersComponent } from './users/users.component';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import { UserModalComponent } from './user-modal/user-modal.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
    UsersComponent,
    UserModalComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule {}
