import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Comment } from 'src/app/models/Comment';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {

  @Input("pubNick") pubNick; 

  protected comment: string;
  protected date: string;
  protected newComment: Comment;

  constructor(
    protected modalController: ModalController,
    protected userService: UsersService
    ) { }

  ngOnInit() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    this.date = dd + '/' + mm +'/' + yyyy
  }

  async close() {
    await this.modalController.dismiss()  
  }

  async addComment(){
    this.newComment = new Comment('Javier', this.date, this.comment)
    var data = [this.pubNick, this.newComment]
    await this.userService.newComment(data)
    await this.modalController.dismiss()
  }

}
