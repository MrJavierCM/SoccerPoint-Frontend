import { Component, OnInit } from '@angular/core';
import { PubsService } from 'src/app/services/pubs.service';
import { Pub } from 'src/app/models/Pub';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SelectedPub } from '../location/selectedPub';
import { CurrentPub } from 'src/app/data/CurrentPub';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-pub-profile',
  templateUrl: './pub-profile.component.html',
  styleUrls: ['./pub-profile.component.scss'],
})
export class PubProfileComponent implements OnInit {

  protected Email: string;
  protected Name: string;
  protected Address: string;
  protected Phone: number;
  protected Location: string;
  protected Nickname: string;
  protected Province: string;
  protected Community: string;

  protected cantEdit: boolean = true;

  constructor(
    protected pubService: PubsService,
    protected alertController: AlertController,
    protected router: Router,
    protected usersService: UsersService
    ) { }

  ngOnInit() {
    this.Email = CurrentPub.email;
    this.Name = CurrentPub.pubName;
    this.Address = CurrentPub.address;
    this.Phone = CurrentPub.phone;
    this.Location = CurrentPub.location;
    this.Nickname = CurrentPub.nickName;
    this.Province = CurrentPub.province;
    this.Community = CurrentPub.community
  }

  edit(){
    if(this.cantEdit){
      this.cantEdit = false
    } else {
      this.cantEdit = true;
    }
  }

  sales() {
    this.router.navigateByUrl('pubProfile/pubSales')
  }

  comments(){
    this.router.navigateByUrl('pubProfile/comments')
  }

  menu(){
    this.router.navigateByUrl('pubProfile/pubMenu')
  }

  teamsVotes(){
    this.router.navigateByUrl('pubProfile/teamsVotes')
  }

  async signOut(){
    var exit = await this.usersService.signOut();
    this.router.navigateByUrl('login')
  }

  async alertSignOut(){
    const alert = await this.alertController.create({
      header: 'Atención',
      message: '¿Deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
        },{
          text: 'Aceptar',
          role:'Accept',
          handler: () =>{
            this.signOut()
          }
        }
      ]
    });
    await alert.present();
  }

  async editProfile(){
    var pub = new Pub(this.Name, this.Nickname,this.Email, this.Location, this.Province, this.Community, this.Address, this.Phone);
    await this.pubService.editProfile(pub, this.Nickname);
    this.cantEdit = true;
  }

  async saveAlert(){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Desea guardar los cambios?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Aceptar',
        handler: () => {
          this.editProfile();
        }
      }]
    })

    await alert.present();
  }
}
