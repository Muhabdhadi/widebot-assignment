import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {UserInterface} from "../../admin/users/user.interface";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profileForm = this.fb.group({
        name: ['', Validators.required],
        username: [''],
        email: [''],
        website: [''],
        phone: ['']
    })
    constructor(private userService: UserService, private fb: FormBuilder) {}

    ngOnInit() {
        this.getUserById();
    }

    getUserById() {
        this.userService.getUserById('1').subscribe({
            next: (user) => {
                console.log(user);
                this.initializeProfileForm(user);
            }
        })
    }

    initializeProfileForm(user: UserInterface) {
        this.profileForm.patchValue({
            name: user.name,
            email: user.email,
            phone: user.phone,
            username: user.username,
            website: user.website
        });
    }
}
