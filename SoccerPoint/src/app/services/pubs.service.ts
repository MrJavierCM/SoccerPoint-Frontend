import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PubsService {

  protected url ='http://localhost:3000/api/';

  protected headers = new Headers();
  
  constructor(public http: HttpClient) {  }

  async getPubsByLocality(locality){
    console.log('ANTES DEL FETCH: ' + locality)
    fetch(this.url + 'pubsByLocation',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      mode: 'cors',
      body: JSON.stringify(locality)      
    }).then(function(response){
      if(response.ok){
        console.log(response)
      }
    })   
        
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
}
