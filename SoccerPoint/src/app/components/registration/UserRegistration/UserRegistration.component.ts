import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './UserRegistration.component.html',
  styleUrls: ['./UserRegistration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  protected registForm: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    protected usersService: UsersService
  ) { 
    this.registForm = formBuilder.group({
      AccountType: new FormControl('', Validators.required),
       PubName: new FormControl('', Validators.compose([
         Validators.required,
       ])),
      Username: new FormControl('', Validators.compose([
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
      Location: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9\s]+$')
      ])),
      Address: new FormControl('', Validators.compose([
         Validators.required
      ])),
      Phone: new FormControl('', Validators.compose([
         Validators.required,
         Validators.pattern('^([0-9]{9})$')
      ])),
      Email: new FormControl('', Validators.compose([
         Validators.required,
         Validators.pattern('^[\w]+@{1}[\w]+\.[a-z]{2,3}$')
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
  }

  equalTo(field_Name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let input = control.value;
      let isValid = control.root.value[field_Name] == input;
      if (!isValid) return { equalTo: { isValid } };
      else return null;
    };
  }

  register(){
    console.log(this.registForm.value);
    this.usersService.postUser(this.registForm.value);
  }
  
  protected validation_messages = {
    Nickname: [
      { type: 'required', message: 'El nombre de usuario es obligatorio.' },
      { type: 'pattern', message: 'El nombre de usuario solo acepta caracteres alfanuméricos.' }
    ],
    Username: [
      { type: 'required', message: 'El nombre es obligatorio.' },
      { type: 'pattern', message: 'El nombre solo acepta caracteres alfabéticos.' }
    ],
    Surname: [
      { type: 'required', message: 'El apellido es obligatorio.' },
      { type: 'pattern', message: 'El apellido de usuario solo acepta caracteres alfabéticos.' }
    ],
    Email: [
      { type: 'required', message: 'El email es obligatorio.' },
      { type: 'pattern', message: 'Introduce un correo electrónico válido.' }
    ],
    Password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'pattern', message: 'La contraseña debe contener, al menos, una letra mayúscula, una letra minúscula y un caracter numérico. Debe tener una longitud mínima de 8 caracteres y ningún caracter especial.' }
    ],
    ConfirmPassword: [
      { type: 'required', message: 'Las contraseñas deben coincidir.' },
      { type: 'equalTo', message: 'Las contraseñas deben coincidir.' }
    ],
  }

}
