import {Component, OnInit} from '@angular/core';
import {AdminService} from "../admin.service";
import {UserInterface} from "./user.interface";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    users: UserInterface[] = [];
    isLoading = false;
    constructor(private adminService: AdminService) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.isLoading = true;
        this.adminService.getUsers().subscribe({
            next: (users) => {
                this.isLoading = false;
                this.users = users;
            },
            error: (err) => {
                this.isLoading = false;
                console.log(err);
            }
        })
    }
}
