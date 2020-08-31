import { Component, OnInit } from '@angular/core';
import { PubsService } from 'src/app/services/pubs.service';
import { Pub } from 'src/app/models/Pub';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SelectedPub } from '../location/selectedPub';
import { CurrentPub } from 'src/app/data/CurrentPub';

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

  protected cantEdit: boolean = true;

  constructor(
    protected pubService: PubsService,
    protected alertController: AlertController,
    protected router: Router
    ) { }

  ngOnInit() {
    this.Email = CurrentPub.email;
    this.Name = CurrentPub.name;
    this.Address = CurrentPub.address;
    this.Phone = CurrentPub.phone;
    this.Location = CurrentPub.location;
    this.Nickname = CurrentPub.nickName;
  }

  edit(){
    if(this.cantEdit){
      this.cantEdit = false
    } else {
      this.cantEdit = true;
    }
  }

  images() {
    this.router.navigateByUrl('pubProfile/pubImages')
  }

  comments(){
    //SelectedPub.selectedPub = this.pub
    this.router.navigateByUrl('pubProfile/comments')
  }

  menu(){
    //SelectedPub.selectedPub = this.pub
    this.router.navigateByUrl('pubProfile/pubMenu')
  }

  async editProfile(){
    var pub = new Pub(this.Name, this.Nickname,this.Email, this.Location, '', '', this.Address, this.Phone);
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
