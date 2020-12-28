import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '../models/Location';
import { Pub } from '../models/Pub';
import { Sale } from '../models/Sale';

@Injectable({
  providedIn: 'root'
})
export class PubsService {

  protected url ='http://localhost:3000/api/';

  protected headers = new Headers();
  
  constructor(public http: HttpClient) {  }

  async getPubsByLocality(location: Location){
    var headersTest = new Headers();
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

  postPub(data, password){
    var jsonContent = [data, password]
    this.headers.set('Content-Type', 'application/json');
    fetch(this.url+'new-pub', {
      method: 'POST',
      headers: this.headers,
      mode: 'cors',
      body: JSON.stringify(jsonContent),
    }).then(async function(response){
      if(response.ok){
        var respuesta = await response.json()
        console.log(respuesta)
        return respuesta;
      }
    }).catch(function(error){
    });
  }

  async getPubByEmail(email: string){
    var resp = await fetch(this.url + 'pubByEmail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({Email: email})
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
    }).then(async function(response){
      return await response.json()
    })
    .catch(function(error){
      return false;
    })

    return resp;
    
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

  async getMenu(pub: Pub){
    var resp = await fetch(this.url + 'menu', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(pub)
    }).then(async function(response){
      return await response.json()
    })
    .catch(function(error){
      return false;
    })

    return resp;
  }

  async addSales(data){
    fetch(this.url + 'addSales', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      mode: 'cors',
      body: JSON.stringify(data),
    }).then(async function(response){
      if(response.ok){
        var respuesta = await response.json()
        return respuesta;
      } else {
        console.log('Respuesta de red OK pero respuesta HTTP no OK');
      }      
    });
  }

  async salesByPub(pub: Pub){
    var resp = await fetch(this.url + 'getSales', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(pub)
    }).then(async function(response){
      return await response.json()
    })
    .catch(function(error){
      return false;
    })

    return resp;
  }

  async deleteSale(sale, pubNick){
    var resp = await fetch(this.url + 'deleteSale',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify([sale, pubNick])
    }).then(function (response){
      return true;
    }).catch(function(error){
      return false;
    });

    return resp;
  }

  async deleteDish(dish, pubNick){
    var resp = await fetch(this.url + 'deleteDish',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify([dish, pubNick])
    }).then(function (response){
      return true;
    }).catch(function(error){
      return false;
    });

    return resp;
  }

  async getTeams(pub: Pub){
    var resp = await fetch(this.url + 'teamsVotes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(pub)
    }).then(async function(response){
      return await response.json()
    })
    .catch(function(error){
      return false;
    })

    return resp;
  }

  async checkNick(nick){
    var resp = await fetch(this.url + 'checkNick',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({"Nickname": nick})
    }).then(function (response){
      return response.json();
    }).catch(function(error){
      return false;
    });

    return resp;
  }
}
