import {Injectable} from "@angular/core";
import {LoginInterface} from "./interfaces/login.interface";
import {BehaviorSubject, Observable, of, tap, throwError} from "rxjs";
import {User} from "./model/user";
import {RolesEnum} from "./enums/roles.enum";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private $user: BehaviorSubject<User | null> = new BehaviorSubject<null | User>(null);
    constructor(private router: Router) {}

    get getUser(): Observable<User | null> {
        return this.$user.asObservable();
    }

    login(loginPayload: LoginInterface): Observable<RolesEnum> {

        if (loginPayload.userName === 'admin' && loginPayload.password === 'admin') {


            return this.observableWithRole(RolesEnum.ADMIN, loginPayload);

        } else if (loginPayload.userName === 'mohamed' && loginPayload.password === 'mohamed') {

            this.$user.next(new User(loginPayload.userName, RolesEnum.USER));

            return this.observableWithRole(RolesEnum.USER, loginPayload);

        } else {

            return throwError('wrong username or password');
        }
    }

    observableWithRole(role: RolesEnum, loginPayload: LoginInterface) {

        return of(role)
            .pipe(
                tap(_ => {
                    const user: User | null = new User(loginPayload.userName, role);

                    this.$user.next(user);

                    localStorage.setItem('user', JSON.stringify(user))
                } )
            )
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['./login']);
        this.$user.next(null);
    }

    autoLogin() {
        const user = JSON.parse(localStorage.getItem('user') as string);
        if(user) {
            this.$user.next(user);
        }
    }
}
