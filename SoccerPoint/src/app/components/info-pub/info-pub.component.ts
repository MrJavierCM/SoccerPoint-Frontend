import { Component, OnInit } from '@angular/core';
import { SelectedPub } from '../location/selectedPub';
import { PubsService } from 'src/app/services/pubs.service';
import { Pub } from 'src/app/models/Pub';
import { ModalController } from '@ionic/angular';
import { AddCommentComponent } from '../add-comment/add-comment.component';

@Component({
  selector: 'app-info-pub',
  templateUrl: './info-pub.component.html',
  styleUrls: ['./info-pub.component.scss'],
})
export class InfoPubComponent implements OnInit {
  protected selectedPub: Pub = null;
  protected comments: Comment [] = [];
  constructor(
    protected pubsService: PubsService,
    protected modalController: ModalController
    ) { }

  ngOnInit() {
    this.selectedPub = SelectedPub.selectedPub
    this.getComments()
  }

  async getComments(){
    this.comments = Object.values(await this.pubsService.commentsByPub(this.selectedPub))
  }

  async addComment(){
    const modal = await this.modalController.create({
      component: AddCommentComponent,
      componentProps: {pubNick: this.selectedPub.Nickname}
    });
    return await modal.present();
  }
}
