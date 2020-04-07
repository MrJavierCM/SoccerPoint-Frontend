import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main/main.component';
import { UserRegistrationComponent } from './components/registration/UserRegistration/UserRegistration.component';
import { PubRegistrationComponent } from './components/registration/pub-registration/pub-registration.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'home',
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
