import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  protected teams: String[] = [];
  constructor() { }

  async getCurrentFixture(){
    var resp = await fetch("https://api-football-v1.p.rapidapi.com/v2/fixtures/rounds/775/current", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
		    "x-rapidapi-key": "3199bd427bmsh4a82e3f96850bddp18508cjsn1f307202f708"
	    }
    })
    
    var respJSON = await resp.json();
    console.log(respJSON);
  }

  getFixtureByNumber(number){
    const startURL = "https://api-football-v1.p.rapidapi.com/v2/fixtures/league/775/Regular_Season_-_"
    const finalURL = "?timezone=Europe%252FMadrid"
    fetch(startURL+number+finalURL, {
	    "method": "GET",
	    "headers": {
	  	   "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
		    "x-rapidapi-key": "3199bd427bmsh4a82e3f96850bddp18508cjsn1f307202f708"
	    }
    })
    .then(response => {
	   console.log(response);
    })
    .catch(err => {
	  console.log(err);
    });
  }

  async getStanding(){
    var resp = await fetch("https://api-football-v1.p.rapidapi.com/v2/leagueTable/775", {
 	    method: "GET",
	    headers: {
		    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
		    "x-rapidapi-key": "3199bd427bmsh4a82e3f96850bddp18508cjsn1f307202f708"
	    }
    })
    var respJSON = await resp.json();
    var table = respJSON.api.standings["0"]
    const start = async () => {
      await table.forEach(team => {
        this.teams.push(team["teamName"])
     });
     return this.teams;
    }
    start();
  }
}
