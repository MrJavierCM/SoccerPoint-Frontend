import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

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
    protected usersService: UsersService
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

  login(){
    if(this.usersService.login(this.loginForm.value)){
         this.router.navigateByUrl('main');
    }
  }

  userRegister(){
    this.router.navigateByUrl('UserRegister')
  }

  pubRegister(){
    this.router.navigateByUrl('PubRegister')
  }

}