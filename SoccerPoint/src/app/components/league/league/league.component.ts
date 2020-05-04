import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/services/football.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss'],
})
export class LeagueComponent implements OnInit {
  protected standing: string[] = [];

  constructor(protected footballService: FootballService) { }

  ngOnInit() {}

  getStanding(){
    this.footballService.getStanding();
  }

  test(){
    this.footballService.getCurrentFixture();
  }

}
