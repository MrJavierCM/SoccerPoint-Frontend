import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  protected url ='http://localhost:3000/api/';

  protected headers = new Headers();

  protected userExist: boolean = false;
  

  constructor(public http: HttpClient) {  }

  async getUsers(){
      const req = this.url + 'Users';
      const resp = await fetch(req);
      const respJSON = await resp.json();
      console.log(respJSON);
      return respJSON;
  }

  async login(data){
    const req = this.url + 'Login'
    const send = await fetch(req,{
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(function(response){
      if(response.ok){
        var respuesta = response.json();
        return true;
      }
    })
    .catch(function(error){
      return false;
    })
  }

  postUser(data, password){
    var jsonContent = [data, password];
    this.headers. set('Content-Type', 'application/json');
    fetch(this.url+'new-user', {
      method: 'POST',
      headers: this.headers,
      mode: 'cors',
      body: JSON.stringify(jsonContent),
    }).then(async function(response){
      if(response.ok){
        var respuesta = await response.json()
        console.log(respuesta)
        console.log('ESTO ES UNA PRUEBA: ' + response);
        return respuesta;
      } else {
        console.log('Respuesta de red OK pero respuesta HTTP no OK');
      }      
    })
    .catch(function(error){
      if(error.code == 'auth/email-already-in-use'){
        console.log('EMAIL EN USOOOOOO')
      }
      console.log('ERROR: '+ error);
      console.log('Hubo un problema con la petición Fetch: ' + error.message);
    });
  }

}
