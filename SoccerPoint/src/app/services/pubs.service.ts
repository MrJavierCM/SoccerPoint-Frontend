import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '../models/Location';
import { Pub } from '../models/Pub';
import { Dish } from '../models/Dish';

@Injectable({
  providedIn: 'root'
})
export class PubsService {

  protected url ='http://localhost:3000/api/';

  protected headers = new Headers();
  
  constructor(public http: HttpClient) {  }

  async getPubsByLocality(location: Location){
    var headersTest = new Headers();
    //headersTest.append('Access-Control-Allow-Origin', '*');
    //headersTest.append('Access-Control-Allow-Methods','POST, GET, OPTIONS, PUT');
    //headersTest.append('Accept', 'application/json');
    headersTest.set('Content-Type', 'application/json')
    var resp = await fetch(this.url + 'pubsByLocation',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(location)
    })

    return await resp.json();        
  }

  postPub(data){
    this.headers.set('Content-Type', 'application/json');
    fetch(this.url+'new-pub', {
      method: 'POST',
      headers: this.headers,
      mode: 'cors',
      body: JSON.stringify(data),
    }).then(function(response){
      if(response.ok){
        ((res) => res.json())
      } else {
        console.log('Respuesta de red OK pero respuesta HTTP no OK');
      }      
    })
    .catch(function(error){
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
  }

  async getPubByEmail(pub: Pub){
    var resp = await fetch(this.url + 'pubsByEmail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(pub)
    })

    return await resp.json();
  }

  async editProfile(pub: Pub, nickname: string){
    await fetch(this.url + 'editProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify([pub, nickname])
    })
  }

  async commentsByPub(pub: Pub){
    var resp = await fetch(this.url + 'commentsByPub', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(pub)
    })
    return await resp.json()
  }

  async newDish(addDish){
    await fetch(this.url + 'addDish', {
      method: 'POST',
      headers: {        
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(addDish)
    })
  }
}
