import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './components/app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './components/main/main/main.component';
import { UserRegistrationComponent } from './components/registration/UserRegistration/UserRegistration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PubRegistrationComponent } from './components/registration/pub-registration/pub-registration.component';
import { LocationsService } from './services/locations.service';
import { LocationComponent } from './components/location/location.component';
import { LeagueComponent } from './components/league/league/league.component';
import { TeamComponent } from './components/team/team.component';
import { FootballService } from './services/football.service';
import { SettingsComponent } from './components/settings/settings.component';
import { PubProfileComponent } from './components/pub-profile/pub-profile.component';
import { InfoPubComponent } from './components/info-pub/info-pub.component';
import { CommentsComponent } from './components/comments/comments.component';
import { Camera } from '@ionic-native/camera/ngx'
import { PubImagesComponent } from './components/pub-images/pub-images.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { PubMenuComponent } from './components/pub-menu/pub-menu.component';
import { PubSalesComponent } from './components/pub-sales/pub-sales.component';
import { AddSalesComponent } from './components/add-sales/add-sales.component';
import { VoteTeamComponent } from './components/vote-team/vote-team.component';
import { TeamsVotesComponent } from './components/teams-votes/teams-votes.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserRegistrationComponent,
    PubRegistrationComponent,
    LocationComponent,
    LeagueComponent,
    TeamComponent,
    SettingsComponent,
    PubProfileComponent,
    InfoPubComponent,
    CommentsComponent,
    PubImagesComponent,
    AddCommentComponent,
    PubMenuComponent,
    AddDishComponent,
    PubSalesComponent,
    AddSalesComponent,
    VoteTeamComponent,
    TeamsVotesComponent
  ],
  entryComponents: [AddCommentComponent, AddDishComponent, AddSalesComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocationsService,
    FootballService,
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
