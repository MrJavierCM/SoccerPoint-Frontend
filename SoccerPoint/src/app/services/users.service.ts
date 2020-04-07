import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  protected url ='http://localhost:3000/api/';

  protected headers = new Headers();
  

  constructor(public http: HttpClient) {  }

  getUser(nick){

  }

  postUser(data){
    this.headers. set('Content-Type', 'application/json');
    fetch(this.url+'new-user', {
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
