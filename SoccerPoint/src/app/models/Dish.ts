export class Dish{
    Name: string;
    Price: number;
    Positive: number;
    Negative: number;

    constructor(name: string, price: number, positive: number, negative: number){
        this.Name = name
        this.Price = price
        this.Positive = positive
        this.Negative = negative
    }
}