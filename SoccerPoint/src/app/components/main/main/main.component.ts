import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  click(tab: string){
    switch(tab) {
      case "location":
        this.router.navigateByUrl('main/location');
        break;
        case "league":
        this.router.navigateByUrl('main/league');
        break;
        case "team":
        this.router.navigateByUrl('main/team');
        break;
        case "settings":
        this.router.navigateByUrl('main/settings');
        break;
    }
  }

}
