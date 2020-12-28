import { Component, OnInit } from '@angular/core';
import { CurrentClient } from 'src/app/data/currentClient';
import { CurrentPub } from 'src/app/data/CurrentPub';
import { Pub } from 'src/app/models/Pub';
import { PubsService } from 'src/app/services/pubs.service';
import { Team } from 'src/app/models/Team';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { VoteTeamComponent } from '../vote-team/vote-team.component';

@Component({
  selector: 'app-teams-votes',
  templateUrl: './teams-votes.component.html',
  styleUrls: ['./teams-votes.component.scss'],
})
export class TeamsVotesComponent implements OnInit {

  protected teams: any[] = [];
  protected isClient: boolean = false;
  protected haveVotes: boolean = false;
  protected selectedPub: Pub;

  constructor(protected pubsService: PubsService, protected router: Router, protected modalController: ModalController) { }

  ngOnInit() {
    this.isClient = CurrentClient.isClient;
    this.selectedPub = new Pub(CurrentPub.pubName, CurrentPub.nickName, CurrentPub.email, CurrentPub.location, CurrentPub.province, CurrentPub.community, CurrentPub.address, CurrentPub.phone)
    this.getVotes();
  }

  async getVotes(){
    var team = await this.pubsService.getTeams(this.selectedPub)
    this.teams = [];
    if(team != false){
      Object.values(team).forEach(element => {
        var newTeam = new Team(element["Team"], element["Votes"])
        
        this.teams.push(newTeam)
      });
      this.haveVotes = true;
    }
  }

  // addVote(){
  //   this.router.navigateByUrl('pubProfile/teamsVotes/addVote');
  // }

  async addVote(){
    const modal = await this.modalController.create({
      component: VoteTeamComponent,
      componentProps: {pubNick: CurrentPub.nickName}
    });
    modal.onDidDismiss().then(()=>{
      this.getVotes();
    })
    return await modal.present();
  }

}
