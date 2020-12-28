import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { ModalController, AlertController } from '@ionic/angular';
import { AddDishComponent } from '../add-dish/add-dish.component';
import { Pub } from 'src/app/models/Pub';
import { CurrentPub } from 'src/app/data/CurrentPub';
import { PubsService } from 'src/app/services/pubs.service';
import { CurrentClient } from 'src/app/data/currentClient';
import { UsersService } from 'src/app/services/users.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-pub-menu',
  templateUrl: './pub-menu.component.html',
  styleUrls: ['./pub-menu.component.scss'],
})
export class PubMenuComponent implements OnInit {
  
  protected dishes: Dish[]=[]
  protected selectedPub: Pub = null;
  protected isClient: boolean;

  protected haveMenu: boolean;
  protected isPub: boolean = false;

  constructor(
    protected modalController: ModalController,
    protected pubsService: PubsService,
    protected usersService: UsersService,
    protected alertController: AlertController) { }

  ngOnInit() {   
    this.isPub = CurrentPub.isBar;
    this.selectedPub = new Pub(CurrentPub.pubName, CurrentPub.nickName, CurrentPub.email, CurrentPub.location, CurrentPub.province, CurrentPub.community, CurrentPub.address, CurrentPub.phone);
    this.isClient = CurrentClient.isClient;
    this.getMenu()
  }

  async getMenu(){
    var menu = await this.pubsService.getMenu(this.selectedPub)
    
    if(menu != false){
      this.dishes = Object.values(menu)
      this.haveMenu= true;
    }
  }

  async addDish(){
    const modal = await this.modalController.create({
      component: AddDishComponent,
      componentProps: {pubNick: this.selectedPub.Nickname}
    });
    return await modal.present();
  }

  async like(dish){
    var dishLike = dish
    const alert = await this.alertController.create({
      header: 'Atención',
      message: '¿Desea darle "Like" a este plato?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Aceptar',
        handler: () => {
        this.usersService.addLike(CurrentPub.nickName, dishLike);
        this.getMenu();
       }
      }]
    })
    await alert.present()
    
  }

  async dislike(dish){
    var dishUnlike = dish
    const alert = await this.alertController.create({
      header: 'Atención',
      message: '¿Desea darle "Dislike" a este plato?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Aceptar',
        handler: () => {
        this.usersService.addDislike(CurrentPub.nickName, dishUnlike);
        this.getMenu();
       }
      }]
    })
    await alert.present()
  }

  async deleteDish(dish){
    const alert = await this.alertController.create({
      header: 'Atención',
      message: '¿Desea eliminar este plato?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Aceptar',
        handler: () => {
        this.pubsService.deleteDish(dish, CurrentPub.nickName);
        this.getMenu();
       }
      }]
    })
    await alert.present()
  }
}
