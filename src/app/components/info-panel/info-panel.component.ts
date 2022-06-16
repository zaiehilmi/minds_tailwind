import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent implements OnInit {

  siteinfo: iSiteInfo = {
    id: '123456',
    type: 'unknown',
    service: '4G',
    address: 'Taman Mas Suria, Jalan Mas Suria, Kuala Lumpur, Malaysia'
  }

  netStatusComment: string = 'Our network is performing as expected at your current location. If we are doing work on the phone masts near you we\'ll tell you about it here';

  signalStrength: string = '5G';

  constructor() { }

  ngOnInit(): void {
  }

}

interface iSiteInfo {
  id: string;
  type: string;
  service: string;
  address: string;
}