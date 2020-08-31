import { Component, OnInit } from '@angular/core';
import { LocationsService } from 'src/app/services/locations.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PubsService } from 'src/app/services/pubs.service';
import { Pub } from 'src/app/models/Pub';
import { LoadingController } from '@ionic/angular';
import { Location } from 'src/app/models/Location';
import { SelectedPub } from './selectedPub';
import { Router } from '@angular/router';
import { CurrentPub } from 'src/app/data/CurrentPub';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {

  protected locationForm: FormGroup;
  protected provinces: String[] = [];
  protected localities: String[] = [];
  protected pubs: Pub[]=[];
  protected loadingInfo;

  constructor(protected locationsService: LocationsService,
    protected pubsService: PubsService,
    protected formBuilder: FormBuilder,
    protected loadingController: LoadingController,
    private router: Router
    ) {
      this.locationForm = formBuilder.group({
        Community: new FormControl('', Validators.required),
        Province: new FormControl('', Validators.required),
        Locality: new FormControl('', Validators.required)
      })
     }

  ngOnInit() {}

  async getProvinces(){
    this.showLoadingInformation();
    this.provinces = (await this.locationsService.getProvinces(this.locationForm.value.Community)).sort();
    this.stopLoadingInformation();
  }

  async getLocalities(){
    this.showLoadingInformation();
    this.localities = (await this.locationsService.getLocalities(this.locationForm.value.Province)).sort();
    this.stopLoadingInformation();
  }

  async getPubs(){
    this.showLoadingInformation();
    var location = new Location(this.locationForm.value.Locality, this.locationForm.value.Province, this.locationForm.value.Community)
    this.pubs = await this.pubsService.getPubsByLocality(location);
    this.stopLoadingInformation();
  }

  clickPub(pub){
    CurrentPub.pubName =  pub.Name;
    CurrentPub.email = pub.Email;
    CurrentPub.location = pub.Location;
    CurrentPub.nickName = pub.Nickname;
    CurrentPub.phone = pub.Phone;
    CurrentPub.location = pub.Location;
    CurrentPub.province = pub.Province;
    CurrentPub.community = pub.Community;
    CurrentPub.address = pub.Address
    this.router.navigateByUrl('main/location/infoPub');
  }

  async showLoadingInformation(){
    this.loadingInfo = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'Buscando...',
    })
    .then((res)=>{
      res.present();
      res.onDidDismiss();
    })
  }

  async stopLoadingInformation(){
    await this.loadingController.dismiss();
  }

}
