import {Component} from '@angular/core';
import {LoginService} from "./login.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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
        // @ts-ignore
        this.loginService.login(this.loginForm.value).subscribe({
            next: (res) => {
                this.isLoading = false
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.isLoading = false
                // display error message
            }
        })
    }
}
