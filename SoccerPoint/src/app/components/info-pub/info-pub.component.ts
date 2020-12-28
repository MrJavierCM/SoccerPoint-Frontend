import { Component, OnInit } from '@angular/core';
import { SelectedPub } from '../location/selectedPub';
import { PubsService } from 'src/app/services/pubs.service';
import { Pub } from 'src/app/models/Pub';
import { ModalController } from '@ionic/angular';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { Router } from '@angular/router';
import { CurrentPub } from 'src/app/data/CurrentPub';

@Component({
  selector: 'app-info-pub',
  templateUrl: './info-pub.component.html',
  styleUrls: ['./info-pub.component.scss'],
})
export class InfoPubComponent implements OnInit {
  protected comments: Comment [] = [];
  protected pubName: string = "";
  protected phonePub: number = 0;
  protected addressPub: string = "";

  protected haveComments: boolean = false;

  constructor(
    protected pubsService: PubsService,
    protected modalController: ModalController,
    protected router: Router
    ) { }

  ngOnInit() {
    this.pubName = CurrentPub.pubName;
    this.addressPub = CurrentPub.address;
    this.phonePub = CurrentPub.phone;
    this.getComments()
  }

  async getComments(){
    var pub = new Pub(CurrentPub.pubName, CurrentPub.nickName, CurrentPub.email, CurrentPub.location, CurrentPub.province, CurrentPub.community, CurrentPub.address, CurrentPub.phone)
    var com = await this.pubsService.commentsByPub(pub)
    if(com != false){
      this.comments = Object.values(com)
      this.haveComments = true;
    }
  }

  async addComment(){
    const modal = await this.modalController.create({
      component: AddCommentComponent,
      componentProps: {pubNick: CurrentPub.nickName}
    });
    modal.onDidDismiss().then(()=>{
      this.getComments();
    })
    return await modal.present();
  }

  watchMenu(){
    this.router.navigateByUrl('pubProfile/pubMenu');
  }

  teamsVotes(){
    this.router.navigateByUrl('pubProfile/teamsVotes')
  }

  returnMain(){
    this.router.navigateByUrl('main/location')
  }

  watchSales(){
    this.router.navigateByUrl('pubProfile/pubSales');
  }
}
