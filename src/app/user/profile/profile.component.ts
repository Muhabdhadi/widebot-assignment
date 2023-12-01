import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {UserInterface} from "../../admin/users/user.interface";
import {AdminService} from "../../admin/admin.service";
import {ToasterService} from "../../shared/toasts/toaster.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profileForm = this.fb.group({
        name: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        website: ['', Validators.required],
        phone: ['', Validators.required]
    })
    user: UserInterface | null = null;
    isLoadingUpdate = false;
    constructor(private userService: UserService,
                private adminService: AdminService,
                private toasterService: ToasterService,
                private fb: FormBuilder) {}

    ngOnInit() {
        this.getUserById();
    }

    getUserById() {
        this.userService.getUserById('1').subscribe({
            next: (user) => {
                this.user = user;
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

    updateUserDetails() {
        this.isLoadingUpdate = true;
        const user: UserInterface = {
            ...this.user,
            ...this.profileForm.value as UserInterface
        }
        this.adminService.updateUser(user).subscribe({
            next: (updateUser) => {
                this.isLoadingUpdate = false;
                this.toasterService.show(`profile details been update successfully`, {className: 'bg-success text-light'});
                this.initializeProfileForm(updateUser);
            },
            error: () => {
                this.toasterService.show(`Error while update ${user.name} user`, {className: 'bg-danger text-light'})
                this.isLoadingUpdate = false;
            }
        })
    }

    onUpdateUser() {
        this.validateLoginForm();

        if (this.profileForm.invalid) { return; }

        this.updateUserDetails();
    }

    validateLoginForm() {
        Object.values(this.profileForm.controls).forEach(control => {
            if (control.invalid) {
                control.markAsTouched();
                control.updateValueAndValidity({onlySelf: true});
            }
        });
    }
}
