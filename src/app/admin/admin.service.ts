import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {UserInterface} from "./users/user.interface";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    usersBaseUrl = environment.jsonplaceholder + 'users'
    constructor(private http: HttpClient) {}

    getUsers(): Observable<UserInterface[]> {
        return this.http.get<UserInterface[]>(this.usersBaseUrl);
    }
}