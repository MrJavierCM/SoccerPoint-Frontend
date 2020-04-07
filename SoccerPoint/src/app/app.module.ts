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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PubRegistrationComponent } from './components/registration/pub-registration/pub-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    UserRegistrationComponent,
    PubRegistrationComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
