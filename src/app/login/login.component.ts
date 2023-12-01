import {Component} from '@angular/core';
import {LoginService} from "./login.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RolesEnum} from "./enums/roles.enum";
import {ToasterService} from "../shared/toasts/toaster.service";
import {LoginInterface} from "./interfaces/login.interface";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm = this.fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required]
    });

    isLoading = false

    constructor(private loginService: LoginService,
                private router: Router,
                private toasterService: ToasterService,
                private fb: FormBuilder) {
    }

    onLoginSubmit() {
        this.validateLoginForm();

        if (this.loginForm.invalid) {
            return;
        }
        this.login();
    }

    validateLoginForm() {
        Object.values(this.loginForm.controls).forEach(control => {
            if (control.invalid) {
                control.markAsTouched();
                control.updateValueAndValidity({onlySelf: true});
            }
        });
    }

    login() {
        this.isLoading = true;

        this.loginService.login(this.loginForm.value as LoginInterface).subscribe({
            next: (loggedInRole) => {
                this.isLoading = false
                switch (loggedInRole) {
                    case RolesEnum.ADMIN:
                        this.router.navigate(['/admin']);
                        break
                }
            },
            error: () => {
                this.isLoading = false
                this.toasterService.show('Invalid username or password', {className: 'bg-danger text-light'})

            }
        })
    }
}
