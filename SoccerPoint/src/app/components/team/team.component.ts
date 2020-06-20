import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {

  protected infoTeam: any;
  protected teamID: number;
  protected fixtures: any;
  protected teamSelected: boolean = false;
  protected loadingInfo;

  constructor(protected footballService: FootballService, protected loadingController: LoadingController) { }

  ngOnInit() {}


  async getInfoTeam(){
    this.showLoadingInformation();
    var resp = await this.footballService.getInfoTeam(this.teamID)
    var respJSON = await resp.json();
    this.infoTeam = respJSON.api.teams["0"]
    this.teamSelected = true;
    var respTeam = await this.footballService.getFixtureByTeam(this.teamID)
    var respTeamJSON = await respTeam.json();
    this.fixtures = respTeamJSON.api.fixtures;
    this.stopLoadingInformation()
  }

  async showLoadingInformation(){
    this.loadingInfo = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Buscando...',
    })
    .then((res)=>{
      res.present();
      res.onDidDismiss();
    })
  }

  async stopLoadingInformation(){
    await this.loadingController.dismiss();
  }
}
