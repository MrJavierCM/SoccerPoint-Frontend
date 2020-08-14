export class Comment {
    User: string;
    Date: string;
    Commentary: string;

    constructor(user: string, date: string, commentary: string){
        this.User = user;
        this.Date = date;
        this.Commentary = commentary;
    }
}