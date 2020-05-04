import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from 'src/app/models/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  
  protected provinces: String[] = [];
  protected municipes: String[] = [];

  protected beginingURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=espana-municipios&q=';

  protected finalURL = '&lang=+&facet=communidad_autonoma&facet=provincia&facet=municipio'

  constructor(protected http: HttpClient) { }

  async getProvinces(community){
    this.provinces = [];
    const inicioURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=provincias-espanolas&q=';
    const finalURL = '&sort=provincia&facet=ccaa&facet=provincia'
    var string = community.toString().replace('_', '+');
 
    var url = inicioURL+string+finalURL;
    const resp = await fetch(url);
    const respJSON = await resp.json();
    var records = respJSON['records'];
    const start = async() => {
      await records.forEach(record => {
        var nombre = record['fields'].texto;
        this.provinces.push(nombre);      
      })
      return this.provinces;
    }
    return start();
  }

  async getLocalities(province){
    this.municipes = [];
    const inicioURL = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=espana-municipios&rows=442&facet=communidad_autonoma&facet=provincia&facet=municipio&refine.provincia="
    var string = province.replace(' ', '+');
    var string = string.replace('ñ', '%C3%B1');
    var url = inicioURL + string;
    const resp = await fetch(url);
    const respJSON = await resp.json();
    var records = respJSON['records'];
    const start = async() => {
      await records.forEach(record => {
        var nombre = record['fields'].municipio;
        this.municipes.push(nombre);      
      })
      return this.municipes;
    }
    return start();
  }

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
