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
    private user!: User;
    constructor(private router: Router) {}

    get getUser(): Observable<User | null> {
        return this.$user.asObservable();
    }

    changeUserRole(tempRole: RolesEnum) {
        this.user = new User(this.user?.username, tempRole, this.user.originalRole);

        this.$user.next(this.user);

        if(tempRole === RolesEnum.USER) {
            this.router.navigate(['./user']);
        }

        if(tempRole === RolesEnum.ADMIN) {
            this.router.navigate(['./admin']);
        }
    }

    login(loginPayload: LoginInterface): Observable<RolesEnum> {

        if (loginPayload.userName === 'admin' && loginPayload.password === 'admin') {


            return this.observableWithRole(RolesEnum.ADMIN, loginPayload);

        } else if (loginPayload.userName === 'mohamed' && loginPayload.password === 'mohamed') {

            return this.observableWithRole(RolesEnum.USER, loginPayload);

        } else {

            return throwError('wrong username or password');
        }
    }

    observableWithRole(role: RolesEnum, loginPayload: LoginInterface) {

        return of(role)
            .pipe(
                tap(_ => {
                    this.user = new User(loginPayload.userName, role, role);

                    this.$user.next(this.user);

                    localStorage.setItem('user', JSON.stringify(this.user))
                } )
            )
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['./login']);
        this.$user.next(null);
    }

    autoLogin() {
        this.user = JSON.parse(localStorage.getItem('user') as string);
        if(this.user) {
            this.$user.next(this.user);
        }
    }
}
