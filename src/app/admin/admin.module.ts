import {NgModule} from "@angular/core";
import {AdminRoutingModule} from "./admin-routing.module";
import { UsersComponent } from './users/users.component';

@NgModule({
    declarations: [
    UsersComponent
  ],
    imports: [AdminRoutingModule]
})
export class AdminModule {}
