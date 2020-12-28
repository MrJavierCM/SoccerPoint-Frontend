import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Comment } from 'src/app/models/Comment';
import { UsersService } from 'src/app/services/users.service';
import { CurrentClient } from 'src/app/data/currentClient';

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
    protected userService: UsersService,
    protected alertController: AlertController
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

  async alertComment(){
    const alert = await this.alertController.create({
      header: 'Atención',
      message: '¿Desea agregar el comentario?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Aceptar',
        handler: () => {
          this.addComment();
        }
      }]
    })

    await alert.present();
  }

  async addComment(){
    this.newComment = new Comment(CurrentClient.nickName, this.date, this.comment)
    var data = [this.pubNick, this.newComment]
    await this.userService.newComment(data)
    await this.modalController.dismiss()
  }

}
