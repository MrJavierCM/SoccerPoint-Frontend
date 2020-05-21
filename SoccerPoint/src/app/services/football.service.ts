import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  protected teams: string[] = [];
  constructor() { }

  async getCurrentFixture(){
    var resp = await fetch("https://api-football-v1.p.rapidapi.com/v2/fixtures/league/775/next/10", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "3199bd427bmsh4a82e3f96850bddp18508cjsn1f307202f708"
      }
    })
    return await resp;
  }

  async getFixtureByNumber(number){
    const startURL = "https://api-football-v1.p.rapidapi.com/v2/fixtures/league/775/Regular_Season_-_";
    const finalURL = "?timezone=Europe%252FLondon";
    var url = startURL+number;
    console.log("URL: " + url);
    var resp = await fetch(url, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "3199bd427bmsh4a82e3f96850bddp18508cjsn1f307202f708"
      }
    })
    return await resp;
  }

  async getStanding(){
    var resp = await fetch("https://api-football-v1.p.rapidapi.com/v2/leagueTable/775", {
 	    method: "GET",
	    headers: {
		    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
		    "x-rapidapi-key": "3199bd427bmsh4a82e3f96850bddp18508cjsn1f307202f708"
	    }
    })
    return await resp;
    // var table = respJSON.api.standings["0"]
    // const start = async () => {
    //   await table.forEach(team => {
    //     this.teams.push(team["teamName"])
    //  });
    //  return this.teams;
    // }
    // return start();
  }
}
