export class Pub {
    Name: string
    Nickname: string
    Email: string
    Location: string
    Province: string
    Community: string    
    Address: string
    Phone: Number

    constructor(name: string, nickname: string, email: string, location: string, province: string, community: string, address: string, phone: Number){
        this.Name = name;
        this.Nickname = nickname;
        this.Email = email;
        this.Location = location;
        this.Province = province;
        this.Community = community;
        this.Address = address;
        this.Phone = phone;
    }
}