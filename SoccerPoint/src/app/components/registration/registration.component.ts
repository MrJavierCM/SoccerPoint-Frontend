import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  protected registForm: FormGroup;
  protected typeAccount: any;

  constructor(
    protected formBuilder: FormBuilder
  ) { 
    this.registForm = formBuilder.group({
      AcoountType: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      Surname: new FormControl('', Validators.compose([
        Validators.required
      ])),
    })
  }

  ngOnInit() {
    this.typeAccount = null;
  }

  changeTypeAccount($event){
    this.typeAccount = $event.target.value;
  }

}
