import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { PubsService } from 'src/app/services/pubs.service';
import { CurrentPub } from 'src/app/data/CurrentPub'
import { CurrentClient } from 'src/app/data/currentClient';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  protected loginForm: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    private router: Router,
    protected usersService: UsersService,
    protected pubsService: PubsService,
    protected alertController: AlertController
  ) {
    this.loginForm = formBuilder.group({
      Email: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      Password: new FormControl('', Validators.compose([
        Validators.required,
      ])),
  })
  }

  async login(){
    var ok = await this.usersService.login(this.loginForm.value)
    var emailForm = this.loginForm.value["Email"];
    if(ok === 0){
      await this.usersService.getUserByEmail(emailForm).then(response => {
        var nick = Object.keys(response)[0]
        CurrentClient.email = response[nick].Email;
        CurrentClient.userName = response[nick].Name;
        CurrentClient.surname = response[nick].Surname;
        CurrentClient.nickName = response[nick].Nickname;
        CurrentClient.isClient = true;
        CurrentPub.isBar = false;
      });

      this.router.navigateByUrl('main/location');
      this.loginForm.reset();
    } else if (ok === 1){
      await this.pubsService.getPubByEmail(emailForm).then(response => {
        var nick = Object.keys(response)[0]
        CurrentPub.email = response[nick].Email;
        CurrentPub.pubName = response[nick].Name;
        CurrentPub.address = response[nick].Address;
        CurrentPub.phone = response[nick].Phone;
        CurrentPub.location = response[nick].Location;
        CurrentPub.nickName = response[nick].Nickname;
        CurrentPub.province = response[nick].Province;
        CurrentPub.community = response[nick].Community
        CurrentPub.isBar = true;
        CurrentClient.isClient = false;
      });

      await this.router.navigateByUrl('pubProfile')
      this.loginForm.reset();
    } else {
      this.checkErrors(Object.values(ok)[0])
    }
    
  }

  async checkErrors(errorCode){
    if(errorCode == "auth/user-not-found"){
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No existe un usuario con ese correo electrónico.',
        buttons: ['Ok']
      });
      await alert.present();
    } else if(errorCode == "auth/wrong-password"){
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Contraseña incorrecta.',
        buttons: ['Ok']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ha ocurrido un error. Vuelva a intentarlo.',
        buttons: ['Ok']
      });
      await alert.present();
    }
  }

  userRegister(){
    this.router.navigateByUrl('UserRegister')    
    this.loginForm.reset();
  }

  pubRegister(){
    this.router.navigateByUrl('PubRegister')    
    this.loginForm.reset();
  }

}