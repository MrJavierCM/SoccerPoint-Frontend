import { Component, OnInit } from '@angular/core';
import { LocationsService } from 'src/app/services/locations.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PubsService } from 'src/app/services/pubs.service';
import { Pub } from 'src/app/models/Pub';

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

  constructor(protected locationsService: LocationsService,
    protected pubsService: PubsService,
    protected formBuilder: FormBuilder,) {
      this.locationForm = formBuilder.group({
        Community: new FormControl('', Validators.required),
        Province: new FormControl('', Validators.required),
        Locality: new FormControl('', Validators.required)
      })
     }

  ngOnInit() {}

  async getProvinces(){
    this.provinces = (await this.locationsService.getProvinces(this.locationForm.value.Community)).sort();
  }

  async getLocalities(){
    this.localities = (await this.locationsService.getLocalities(this.locationForm.value.Province)).sort();
  }

  async getPubs(){
    await this.pubsService.getPubsByLocality(this.locationForm.value.Locality);
  }

}
