import { Component, OnInit, Input } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { ModalController } from '@ionic/angular';
import { PubsService } from 'src/app/services/pubs.service';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss'],
})
export class AddDishComponent implements OnInit {

  @Input("pubNick") pubNick;

  private name: string;
  private price: number;

  constructor(protected modalController: ModalController, protected pubService: PubsService) { }

  ngOnInit() {}

  async createDish(){
    var newDish = new Dish(this.name, this.price, 0, 0)
    await this.pubService.newDish([this.pubNick, newDish]);
    await this.modalController.dismiss()
  }

}
