import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-pub-images',
  templateUrl: './pub-images.component.html',
  styleUrls: ['./pub-images.component.scss'],
})
export class PubImagesComponent implements OnInit {

  imgURL;

  constructor(
    private camera: Camera
  ) { }

  ngOnInit() {}

  takePicture(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((res)=>{
      this.imgURL = 'data:image/jpeg;base64,' + res;
    }).catch( e => {
      console.log(e)
    })
  }
}