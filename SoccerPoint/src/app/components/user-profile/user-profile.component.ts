import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AlertController } from '@ionic/angular';
import { CurrentClient } from 'src/app/data/currentClient';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  
  protected Email: string;
  protected Name: string;
  protected Surname: string;
  protected Nickname: string;

  protected cantEdit: boolean = true;

  constructor(protected usersService: UsersService, protected alertController: AlertController) { }

  ngOnInit() {
    this.Email = CurrentClient.email;
    this.Name = CurrentClient.userName;
    this.Surname = CurrentClient.surname;
    this.Nickname = CurrentClient.nickName;
  }

  edit(){
    if(this.cantEdit){
      this.cantEdit = false
    } else {
      this.cantEdit = true;
    }
  }

  async editProfile(){
    var user = new User(this.Nickname, this.Name, this.Surname, this.Email);
    await this.usersService.editProfile(user, this.Nickname);
    this.cantEdit = true;
  }

}
