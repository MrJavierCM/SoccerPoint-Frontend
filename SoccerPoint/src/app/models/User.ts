export class User {
    Nickname: string
    Name: string
    Surname: string
    Email: string

    constructor(nickname: string, username: string, surname: string, email: string){
        this.Nickname = nickname;
        this.Name = username;
        this.Surname = surname;
        this.Email = email;
    }
}