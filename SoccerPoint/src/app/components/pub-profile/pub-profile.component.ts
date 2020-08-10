import { Component, OnInit } from '@angular/core';
import { PubsService } from 'src/app/services/pubs.service';
import { Pub } from 'src/app/models/Pub';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SelectedPub } from '../location/selectedPub';

@Component({
  selector: 'app-pub-profile',
  templateUrl: './pub-profile.component.html',
  styleUrls: ['./pub-profile.component.scss'],
})
export class PubProfileComponent implements OnInit {

  protected pub = new Pub('','Prueba1','test@test.test','', '', '', '' , 600000000)

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
    this.pubService.getPubByEmail(this.pub).then(response => {
      this.Email = response['0'].Email;
      this.Name = response['0'].Name;
      this.Address = response['0'].Address;
      this.Phone = response['0'].Phone;
      this.Location = response['0'].Location;
      this.Nickname = response['0'].Nickname;
    });
  }

  edit(){
    if(this.cantEdit){
      this.cantEdit = false
    } else {
      this.cantEdit = true;
    }
  }

  comments(){
    SelectedPub.selectedPub = this.pub
    this.router.navigateByUrl('pubProfile/comments')
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
