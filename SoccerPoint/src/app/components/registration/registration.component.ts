import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

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
      PubName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      UserName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z\s]+$')
      ])),
      Surname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z\s]+$')
      ])),
      Nickname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9\s]+$')
      ])),
      Password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$')
      ])),
      ConfirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        this.equalTo('Password')
      ]))
    })
  }

  ngOnInit() {
    this.typeAccount = null;
  }

  changeTypeAccount($event){
    this.typeAccount = $event.target.value;
  }

  equalTo(field_Name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let input = control.value;
      let isValid = control.root.value[field_Name] == input;
      if (!isValid) return { equalTo: { isValid } };
      else return null;
    };
  }
  

}
