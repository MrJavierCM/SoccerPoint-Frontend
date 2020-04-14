export class Pub {
    Name: string
    Nickname: string
    Email: string
    Location: string    
    Address: string
    Phone: BigInteger

    constructor(name: string, nickname: string, email: string, location: string, address: string, phone: BigInteger){
        this.Name = name;
        this.Nickname = nickname;
        this.Email = email;
        this.Location = location;
        this.Address = address;
        this.Phone = phone;
    }
}