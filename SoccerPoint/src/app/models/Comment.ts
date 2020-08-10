export class Comment {
    User: string;
    Date: Date;
    Commentary: string;

    constructor(user: string, date: Date, commentary: string){
        this.User = user;
        this.Date = date;
        this.Commentary = commentary;
    }
}