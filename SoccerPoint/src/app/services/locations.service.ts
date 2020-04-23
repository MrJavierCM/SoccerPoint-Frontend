import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  protected beginingURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=espana-municipios&q=';

  protected finalURL = '&lang=+&facet=communidad_autonoma&facet=provincia&facet=municipio'

  constructor(protected http: HttpClient) { }

  async getLocations(location){
    console.log(location)
    var string = location.replace(' ', '+');

    const request = this.beginingURL + string + this.finalURL;
    
    const resp = await fetch(request);
    const respJSON = await resp.json();

    console.log(respJSON);

    const locality = respJSON.records['0'].fields.municipio;
    const province = respJSON.records['1'].fields.provincia;
    console.log("Locality: "+ locality)
    console.log("Province: " + province)
    const result = locality + ', ' + province
    console.log('Result: ' + result)
    return (result);
  }
}
