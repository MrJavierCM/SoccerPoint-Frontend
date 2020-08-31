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

  async getUserByEmail(email: string){
    var resp = await fetch(this.url + 'userByEmail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({Email: email})
    })
    return await resp.json();;
  }

  async login(data){
    const req = this.url + 'loginApp'
    var resp = await fetch(req,{
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors',
      headers:{
        'Content-Type': 'application/json'
      }
    })  
    return resp.json();
  }

  postUser(data, password){
    var jsonContent = [data, password];
    this.headers.set('Content-Type', 'application/json');
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

  async getInfoUser(nick){
    var resp = await fetch(this.url+'infoUser',{
      method: 'POST',
      headers: this.headers,
      mode: 'cors',
      body: JSON.stringify(nick),
    })
    console.log(resp.json())
    return resp;
  }

  async newComment(data){
    this.headers.set('Content-Type', 'application/json');
    fetch(this.url+'new-comment', {
      method: 'POST',
      headers: this.headers,
      mode: 'cors',
      body: JSON.stringify(data),
    }).then(async function(response){
      if(response.ok){
        var respuesta = await response.json()
        console.log(respuesta)
        console.log('ESTO ES UNA PRUEBA: ' + response);
        return respuesta;
      } else {
        console.log('Respuesta de red OK pero respuesta HTTP no OK');
      }      
    });
  }

  async signOut(){
    await fetch(this.url + 'signOut', {
      method: 'POST',
      headers:{
        'Content-Type': 'aplication/json'
      },
      body: JSON.stringify(true)
    }).then(function(response){
      return response;
    }).catch(function(error){
      return error;
    })
  }
}
