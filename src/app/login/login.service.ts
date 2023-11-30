import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {LoginInterface} from "./interfaces/login.interface";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {User} from "./model/user";
import {RolesEnum} from "./enums/roles.enum";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private $user: BehaviorSubject<{} | User> = new BehaviorSubject({});
    constructor() {}

    login(loginPayload: LoginInterface): Observable<RolesEnum> {

        if (loginPayload.userName === 'admin' && loginPayload.password === 'admin') {

            this.$user.next(new User(loginPayload.userName, RolesEnum.ADMIN));

            return of(RolesEnum.ADMIN);

        } else if (loginPayload.userName === 'mohamed' && loginPayload.password === 'mohamed') {

            this.$user.next(new User(loginPayload.userName, RolesEnum.USER));

            return of(RolesEnum.USER);

        } else {

            return throwError('wrong username or password');
        }
    }
}
