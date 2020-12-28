import { Component, OnInit, Input } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';
import { AlertController, ModalController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { CurrentPub } from 'src/app/data/CurrentPub';

@Component({
  selector: 'app-vote-team',
  templateUrl: './vote-team.component.html',
  styleUrls: ['./vote-team.component.scss'],
})
export class VoteTeamComponent implements OnInit {

  @Input("pubNick") pubNick;

  protected infoTeam: any;
  protected nameTeam: string;
  protected teamID: number;

  constructor(
    protected footballService: FootballService,
    protected alertController: AlertController,
    protected usersService: UsersService,
    protected modalController: ModalController
    ) { }

  ngOnInit() {}
  
  async alertVoteTeam(id){
    const alert = await this.alertController.create({
      header: 'Atención',
      message: '¿Desea votar a ese equipo?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Aceptar',
        handler: () => {
          this.voteTeam(id)
        }
      }]
    })

    await alert.present();
  }

  async voteTeam(value){
    var info = await this.footballService.getInfoTeam(value)
    var respJSON = await info.json();
    this.infoTeam = respJSON.api.teams[0];
    console.log(this.infoTeam["name"])
    this.nameTeam = this.infoTeam.name;
    console.log(this.nameTeam)
    this.usersService.voteTeam(this.pubNick, this.nameTeam);
  }

  async return(){    
    await this.modalController.dismiss()
  }
}
