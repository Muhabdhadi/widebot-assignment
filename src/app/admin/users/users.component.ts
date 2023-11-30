import {Component, OnInit} from '@angular/core';
import {AdminService} from "../admin.service";
import {UserInterface} from "./user.interface";
import {ToasterService} from "../../shared/toasts/toaster.service";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    users: UserInterface[] = [];
    isLoading = false;
    constructor(private adminService: AdminService,
                private toasterService: ToasterService) {
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
            error: () => {
                this.isLoading = false;
                this.toasterService.show('Error while getting list of users', {className: 'bg-danger text-light'})
            }
        })
    }
}
