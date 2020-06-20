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
    InfoPubComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocationsService,
    FootballService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
