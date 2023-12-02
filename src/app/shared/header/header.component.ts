import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../login/login.service";
import {User} from "../../login/model/user";
import {RolesEnum} from "../../login/enums/roles.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    user: User | null = null;
    RolesEnum = RolesEnum;
    constructor(private loginService: LoginService) {}

    ngOnInit() {
        this.loginService.getUser.subscribe({
            next: (user) => {
                console.log(user);
                this.user = user;
            }
        });
    }

    logout() {
        this.loginService.logout();
    }

    changeViewRole(tempRole: RolesEnum) {
        console.log(tempRole);
        this.loginService.changeUserRole(tempRole);
    }

}
