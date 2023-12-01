import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../login/login.service";
import {User} from "../../login/model/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    user: User | null = null;
    constructor(private loginService: LoginService) {}

    ngOnInit() {
        this.loginService.getUser.subscribe({
            next: (user) => {
                this.user = user;
            }
        });
    }

    logout() {
        this.loginService.logout();
    }
}
