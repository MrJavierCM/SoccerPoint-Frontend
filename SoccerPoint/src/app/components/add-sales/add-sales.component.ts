import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PubsService } from 'src/app/services/pubs.service';
import { Sale }from 'src/app/models/Sale'

@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.scss'],
})
export class AddSalesComponent implements OnInit {

  @Input("pubNick") pubNick;

  protected saleName: string;
  protected saleDescription: string;

  constructor(protected modalController: ModalController, protected pubsService: PubsService) { }

  ngOnInit() {}

  async cancel() {
    await this.modalController.dismiss()  
  }

  async add(){
    var sale = new Sale(this.saleName, this.saleDescription)
    var data = [this.pubNick, sale]
    await this.pubsService.addSales(data)
    await this.modalController.dismiss()
  }
}
