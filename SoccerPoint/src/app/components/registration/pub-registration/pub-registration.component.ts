import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PubsService } from 'src/app/services/pubs.service';

@Component({
  selector: 'app-pub-registration',
  templateUrl: './pub-registration.component.html',
  styleUrls: ['./pub-registration.component.scss'],
})
export class PubRegistrationComponent implements OnInit {
  protected registForm: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    protected pubsService: PubsService
  ) { 
    this.registForm = formBuilder.group({
      PubName: new FormControl('', Validators.compose([
         Validators.required,
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
         Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")
      ])),
      Password: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$')
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
    this.pubsService.postPub(this.registForm.value);
  }
  
  protected validation_messages = {
    Nickname: [
      { type: 'required', message: 'El nombre de usuario es obligatorio.' },
      { type: 'pattern', message: 'El nombre de usuario solo acepta caracteres alfanuméricos.' }
    ],
    Pubname: [
      { type: 'required', message: 'El nombre del establecimiento es obligatorio.' }
    ],
    Phone: [
      { type: 'required', message: 'El número de teléfono es obligatorio.' },
      { type: 'pattern', message: 'El número de teléfono debe contener únicamente 9 valores numéricos.' }
    ],
    Location: [
      {
        type: 'required', message: 'La localidad es obligatoria.'
      }
    ],
    Address: [
      { type: 'required', message: 'La dirección del establecimiento es obligatoria.' }
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
