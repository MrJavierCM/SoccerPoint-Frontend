import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss'],
})
export class LeagueComponent implements OnInit {
  protected table: any;
  protected fixture: any;
  protected currentFixture: any;
  protected standingChecked: boolean = false;
  protected fixtureChecked: boolean = false;
  protected currentChecked: boolean = false;
  protected rounds: number [] = [];
  protected roundFixture: number;
  protected loadingInfo;

  constructor(
    protected footballService: FootballService,
    protected loadingController: LoadingController
    ) { }

  ngOnInit() {
    for(var i = 1; i < 39; i++){
      this.rounds[i-1]=i;
    }
  }

  async getStanding(){
    this.fixtureChecked = false;
    this.currentChecked = false;
    this.showLoadingInformation()
    var resp = await this.footballService.getStanding();
    var respJSON = await resp.json();
    this.table = respJSON.api.standings["0"];    
    this.stopLoadingInformation();
    this.standingChecked = true;
  }

  async getFixtureByRound(){
    this.currentChecked = false;
    this.standingChecked = false;    
    this.showLoadingInformation();
    var resp = await this.footballService.getFixtureByNumber(this.roundFixture);
    var respJSON = await resp.json();
    this.stopLoadingInformation();
    this.fixture = respJSON.api.fixtures;
    this.fixtureChecked = true;
  }

  async getCurrentFixture(){
    this.standingChecked = false;
    this.fixtureChecked = false;    
    this.showLoadingInformation();
    var resp = await this.footballService.getCurrentFixture();
    var respJSON = await resp.json();
    this.stopLoadingInformation();
    this.currentFixture = respJSON.api.fixtures;
    this.currentChecked = true;
  }

  segmentChanged(clicked: any){
    switch (clicked.detail.value){
      case "currentFixture":{
        this.getCurrentFixture()
        break;
      }
      case "fixtureByRound":{
        this.getFixtureByRound();
        break;
      }
      case "standing":{        
        this.getStanding();
        break;
      }
    }
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
