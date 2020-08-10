import { Component, OnInit } from '@angular/core';
import { PubsService } from 'src/app/services/pubs.service';
import { Pub } from 'src/app/models/Pub';
import { SelectedPub } from '../location/selectedPub';
import { Comment } from 'src/app/models/Comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  protected comments: Comment[]=[];
  protected selectedPub: Pub = null;

  constructor(protected pubsService: PubsService) { }

  ngOnInit() {
    this.selectedPub = SelectedPub.selectedPub
    this.getComments()
  }

  async getComments(){
    this.comments = Object.values(await this.pubsService.commentsByPub(this.selectedPub))
  }

}
