import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  protected loginForm: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      Username: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      Password: new FormControl('', Validators.compose([
        Validators.required,
      ])),
  })
  }

  register(){
    this.router.navigateByUrl('registration')
  }

}