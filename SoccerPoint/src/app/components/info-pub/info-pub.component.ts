import { Component, OnInit } from '@angular/core';
import { SelectedPub } from '../location/selectedPub';

@Component({
  selector: 'app-info-pub',
  templateUrl: './info-pub.component.html',
  styleUrls: ['./info-pub.component.scss'],
})
export class InfoPubComponent implements OnInit {
  protected selectedPub: any = null;
  constructor() { }

  ngOnInit() {
    this.selectedPub = SelectedPub.selectedPub;
  }

}
