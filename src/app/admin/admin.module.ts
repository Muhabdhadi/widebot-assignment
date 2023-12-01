import {NgModule} from "@angular/core";
import {AdminRoutingModule} from "./admin-routing.module";
import { UsersComponent } from './users/users.component';
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import { UserModalComponent } from './user-modal/user-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmationModalComponent} from "./confirmation-modal/confirmation-modal.component";

@NgModule({
    declarations: [
    UsersComponent,
    UserModalComponent,
    ConfirmationModalComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        SharedModule
    ]
})
export class AdminModule {}
