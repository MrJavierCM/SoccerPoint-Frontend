import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';

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

  constructor(protected footballService: FootballService) { }

  ngOnInit() {
    for(var i = 1; i < 39; i++){
      this.rounds[i-1]=i;
    }
  }

  async getStanding(){
    this.fixtureChecked = false;
    this.currentChecked = false;
    var resp = await this.footballService.getStanding();
    var respJSON = await resp.json();
    this.table = respJSON.api.standings["0"];
    this.standingChecked = true;
  }

  async getFixtureByRound(){
    this.currentChecked = false;
    this.standingChecked = false;
    console.log("Número de la jornada: " + this.roundFixture)
    var resp = await this.footballService.getFixtureByNumber(this.roundFixture);
    var respJSON = await resp.json();
    this.fixture = respJSON.api.fixtures;
    this.fixtureChecked = true;
  }

  async getCurrentFixture(){
    this.standingChecked = false;
    this.fixtureChecked = false;
    var resp = await this.footballService.getCurrentFixture();
    var respJSON = await resp.json();
    this.currentFixture = respJSON.api.fixtures;
    this.currentChecked = true;
  }
}
