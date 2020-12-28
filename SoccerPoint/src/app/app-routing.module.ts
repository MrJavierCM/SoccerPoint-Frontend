import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main/main.component';
import { UserRegistrationComponent } from './components/registration/UserRegistration/UserRegistration.component';
import { PubRegistrationComponent } from './components/registration/pub-registration/pub-registration.component';
import { LocationComponent } from './components/location/location.component';
import { LeagueComponent } from './components/league/league/league.component';
import { TeamComponent } from './components/team/team.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PubProfileComponent } from './components/pub-profile/pub-profile.component';
import { InfoPubComponent } from './components/info-pub/info-pub.component';
import { CommentsComponent } from './components/comments/comments.component';
import { PubImagesComponent } from './components/pub-images/pub-images.component';
import { Pub } from './models/Pub';
import { PubMenuComponent } from './components/pub-menu/pub-menu.component';
import { PubSalesComponent } from './components/pub-sales/pub-sales.component';
import { VoteTeamComponent } from './components/vote-team/vote-team.component';
import { TeamsVotesComponent } from './components/teams-votes/teams-votes.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'UserRegister',
    component: UserRegistrationComponent,
  },
  {
    path: 'PubRegister',
    component: PubRegistrationComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'location',
        component: LocationComponent,
      },
      {
        path: 'league',
        component: LeagueComponent        
      },
      {
        path: 'team',
        component: TeamComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'location/infoPub',
        component: InfoPubComponent
      }
    ]
  },
  {
    path: 'pubProfile',
    component: PubProfileComponent,
  },
  {
    path: 'pubProfile/comments',
    component: CommentsComponent
  },
  {
    path: 'pubProfile/pubImages',
    component: PubImagesComponent
  },
  {
    path: 'pubProfile/pubMenu',
    component: PubMenuComponent
  },
  {
    path: 'pubProfile/pubSales',
    component: PubSalesComponent
  },
  {
    path: 'pubProfile/teamsVotes',
    component: TeamsVotesComponent
  },
  {
    path: 'pubProfile/teamsVotes/addVote',
    component: VoteTeamComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
