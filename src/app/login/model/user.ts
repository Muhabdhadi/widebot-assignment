export class User {
    constructor(public username: string, public role: 'ADMIN' | 'USER') {
        this.username = username;
        this.role = role;
    }
}
