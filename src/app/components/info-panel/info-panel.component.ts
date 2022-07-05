import { Component, OnInit } from '@angular/core';
import { GetInfoService } from 'src/app/services/get-info.service';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent implements OnInit {

  constructor(private getInfoService: GetInfoService) { }

  siteinfo: iSiteInfo = {
    id: '-',
    type: '-',
    service: '2G',
    address: '-'
  }

  netStatusComment: string = 'Our network is performing as expected at your current location. If we are doing work on the phone masts near you we\'ll tell you about it here';

  signalStrength: string = '';

  ngOnInit(): void {
    this.getInfoService.site_id$.subscribe(
      data => { this.siteinfo.id = data; }
    );

    this.getInfoService.status$.subscribe(
      data => { this.netStatusComment = data; }
    );

    this.getInfoService.type_map$.subscribe(
      data => { this.siteinfo.type = data; }
    );

    this.getInfoService.signal$.subscribe(
      data => {
        this.signalStrength = data;
        this.siteinfo.service = data;
      }
    );
  }

}

interface iSiteInfo {
  id: string;
  type: string;
  service: string;
  address: string;
}