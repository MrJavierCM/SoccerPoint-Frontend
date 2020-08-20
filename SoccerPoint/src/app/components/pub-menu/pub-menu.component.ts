import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { ModalController } from '@ionic/angular';
import { AddDishComponent } from '../add-dish/add-dish.component';
import { Pub } from 'src/app/models/Pub';
import { SelectedPub } from '../location/selectedPub';

@Component({
  selector: 'app-pub-menu',
  templateUrl: './pub-menu.component.html',
  styleUrls: ['./pub-menu.component.scss'],
})
export class PubMenuComponent implements OnInit {
  
  protected dishes: Dish[]=[]
  protected selectedPub: Pub = null;


  constructor(protected modalController: ModalController) { }

  ngOnInit() {    
    this.selectedPub = SelectedPub.selectedPub
  }

  async addDish(){
    const modal = await this.modalController.create({
      component: AddDishComponent,
      componentProps: {pubNick: this.selectedPub.Nickname}
    });
    return await modal.present();
  }
}
