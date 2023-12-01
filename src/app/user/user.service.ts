import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserInterface} from "../admin/users/user.interface";
import {Observable} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class UserService {
    usersBaseUrl = environment.jsonplaceholder + 'users'
    constructor(private http: HttpClient) {
    }

    getUserById(userId: string): Observable<UserInterface> {
        return this.http.get<UserInterface>(`${this.usersBaseUrl}/${userId}`);
    }
}
