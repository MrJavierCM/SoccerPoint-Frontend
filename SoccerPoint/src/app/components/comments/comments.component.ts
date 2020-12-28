import { Component, OnInit } from '@angular/core';
import { PubsService } from 'src/app/services/pubs.service';
import { Pub } from 'src/app/models/Pub';
import { SelectedPub } from '../location/selectedPub';
import { Comment } from 'src/app/models/Comment';
import { CurrentPub } from 'src/app/data/CurrentPub';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  protected comments: Comment[]=[];
  protected selectedPub: Pub = null;

  protected haveComments: boolean = false;

  constructor(protected pubsService: PubsService) { }

  ngOnInit() {
    this.selectedPub = new Pub(CurrentPub.name, CurrentPub.nickName, CurrentPub.email, CurrentPub.location, CurrentPub.province, CurrentPub.community, CurrentPub.address, CurrentPub.phone)
    this.getComments()
  }

  async getComments(){
    var com = await this.pubsService.commentsByPub(this.selectedPub)
    if(com != false){
      this.comments = Object.values(com)
      this.haveComments = true;
    }
  }

}
