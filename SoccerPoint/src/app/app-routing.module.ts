import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main/main.component';
import { UserRegistrationComponent } from './components/registration/UserRegistration/UserRegistration.component';
import { PubRegistrationComponent } from './components/registration/pub-registration/pub-registration.component';
import { LocationComponent } from './components/location/location.component';
import { LeagueComponent } from './components/league/league/league.component';

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
        component: LocationComponent
      },
      {
        path: 'league',
        component: LeagueComponent
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
