import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserInterface} from "../users/user.interface";
import {FormBuilder, Validators} from "@angular/forms";
import {AdminService} from "../admin.service";
import {ToasterService} from "../../shared/toasts/toaster.service";

@Component({
    selector: 'app-user-modal',
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
    @Input() user!: UserInterface;
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() updatedUser: EventEmitter<UserInterface> = new EventEmitter();
    userForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required]
    });
    isLoadingUpdate = false;

    constructor(private fb: FormBuilder,
                private adminService: AdminService,
                private toasterService: ToasterService) {}

    ngOnInit() {
        console.log(this.user);
        this.initializeForm(this.user);
    }

    initializeForm(user: UserInterface) {
        this.userForm.patchValue({
            name: user?.name,
            email: user?.email
        });
    }

    onCancel() {
        this.cancel.emit();
    }

    onUpdateUser() {

        this.validateLoginForm();

        if (this.userForm.invalid) { return; }

        this.isLoadingUpdate = true;

        const updatedUser: UserInterface = {
            ...this.user,
            name: this.userForm.get('name')?.value as string,
            email: this.userForm.get('email')?.value as string
        }

        this.updateUser(updatedUser);
    }

    validateLoginForm() {
        Object.values(this.userForm.controls).forEach(control => {
            if (control.invalid) {
                control.markAsTouched();
                control.updateValueAndValidity({onlySelf: true});
            }
        });
    }

    updateUser(updatedUser: UserInterface) {
        this.adminService.updateUser(updatedUser).subscribe({
            next: (user) => {
                this.updatedUser.emit(user)
                this.isLoadingUpdate = false;
                this.onCancel();
                this.toasterService.show(`${updatedUser.name} updated successfully`, {className: 'bg-success text-light'});
            },
            error: () => {
                this.isLoadingUpdate = false;
                this.toasterService.show(`Error while update ${updatedUser.name} user`, {className: 'bg-danger text-light'})
            }
        })
    }
}
