import { Component, OnInit } from '@angular/core';
import { PubsService } from 'src/app/services/pubs.service';
import { CurrentClient } from 'src/app/data/currentClient';
import { CurrentPub } from 'src/app/data/CurrentPub';
import { ModalController } from '@ionic/angular';
import { AddSalesComponent } from '../add-sales/add-sales.component';
import { Pub } from 'src/app/models/Pub';
import { Sale } from 'src/app/models/Sale';

@Component({
  selector: 'app-pub-sales',
  templateUrl: './pub-sales.component.html',
  styleUrls: ['./pub-sales.component.scss'],
})
export class PubSalesComponent implements OnInit {

  protected sales: Sale[]=[];
  protected isPub: boolean = false;
  protected selectedPub: Pub;
  protected haveSales: boolean = false;

  constructor(
    protected pubsService: PubsService,
    protected modalController: ModalController
  ) { }

  ngOnInit() {
    this.isPub = CurrentPub.isBar;
    this.selectedPub = new Pub(CurrentPub.name, CurrentPub.nickName, CurrentPub.email, CurrentPub.location, CurrentPub.province, CurrentPub.community, CurrentPub.address, CurrentPub.phone)
    this.getSales()
  }

  async addSales(){
    const modal = await this.modalController.create({
      component: AddSalesComponent,
      componentProps: {pubNick: CurrentPub.nickName}
    });
    return await modal.present();
  }

  async getSales(){
    var sal = await this.pubsService.salesByPub(this.selectedPub)
    if(sal != false){
      Object.values(sal).forEach(element => {
        var newSal = new Sale(element["Name"], element["Description"])
        this.sales.push(newSal)
      });
      this.haveSales = true;
    }
  }

  async deleteSale(sale){
    this.pubsService.deleteSale(sale, CurrentPub.nickName)
  }

}
