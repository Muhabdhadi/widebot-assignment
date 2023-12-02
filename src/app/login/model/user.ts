import {RolesEnum} from "../enums/roles.enum";

export class User {
    constructor(public username: string, public role: RolesEnum, public originalRole: RolesEnum | null) {
        this.username = username;
        this.role = role;
        this.originalRole = originalRole;
    }
}
