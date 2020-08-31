import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { PubsService } from 'src/app/services/pubs.service';
import { CurrentPub } from 'src/app/data/CurrentPub'
import { CurrentClient } from 'src/app/data/currentClient';

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
    protected pubsService: PubsService
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
        CurrentClient.nickName = response[nick].Nickname 
      });

      this.router.navigateByUrl('main/location');
    } else if (ok === 1){
      await this.pubsService.getPubByEmail(emailForm).then(response => {
        var nick = Object.keys(response)[0]
        CurrentPub.email = response[nick].Email;
        CurrentPub.pubName = response[nick].Name;
        CurrentPub.address = response[nick].Address;
        CurrentPub.phone = response[nick].Phone;
        CurrentPub.location = response[nick].Location;
        CurrentPub.nickName = response[nick].Nickname;
      });

      await this.router.navigateByUrl('pubProfile')
    }
    
  }

  userRegister(){
    this.router.navigateByUrl('UserRegister')
  }

  pubRegister(){
    this.router.navigateByUrl('PubRegister')
  }

}