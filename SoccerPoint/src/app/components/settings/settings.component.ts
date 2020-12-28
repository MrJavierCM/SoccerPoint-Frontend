import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  constructor(protected usersService: UsersService,
    protected router: Router,
    protected alertController: AlertController
    ) { }

  ngOnInit() {}

  async signOut(){
    var exit = await this.usersService.signOut();
    this.router.navigateByUrl('login')
  }

  async alertSignOut(){
    const alert = await this.alertController.create({
      header: 'Atención',
      message: '¿Deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancel',
        },{
          text: 'Aceptar',
          role:'Accept',
          handler: () =>{
            this.signOut()
          }
        }
      ]
    });
    await alert.present();
  }

}
