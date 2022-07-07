import { Component, OnInit, Output } from '@angular/core';

import { GetInfoService } from 'src/app/services/get-info.service';
import { ReadApiService } from 'src/app/services/read-api.service';
import { ToggleService } from 'src/app/services/toggle.service';
import { MapData } from './map';

declare const L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  data4g: MapData[] = [];
  data5g: MapData[] = [];
  errorMsg!: string;
  map: any;


  constructor(
    private readApiService: ReadApiService,
    private setinfoService: GetInfoService,
    public toggleService: ToggleService,
  ) { }


  ngOnInit() {
    this.toggleService.register('site_filter');
    // read api data
    this.readApiService.get4gMapData()
      .subscribe({
        next: async (data: MapData[]) => { this.data4g = data; },
        error: (err: string) => { this.errorMsg = err; }
      });

    this.readApiService.get5gMapData()
      .subscribe({
        next: async (data: MapData[]) => { this.data5g = data; },
        error: (err: string) => { this.errorMsg = err; }
      });

    // get current position
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }

    navigator.geolocation.getCurrentPosition(async position => {
      let coords = position.coords;

      this.map = L.map('map').setView([coords.latitude, coords.longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(this.map);

    });

    setTimeout(() => {
      this.mappingMap(this.data4g, this.group4g, '#20B2AA', '4G');
      this.mappingMap(this.data5g, this.group5g, '#ff3535', '5G');

      console.log((this.data4g.length === 0) ? 'reload again' : 'map is ready');
    }, 1000);

    this.watchPosition();
  }


  openSiteFilter($event: Event) {
    $event.preventDefault();
    this.toggleService.toggleComponent('site_filter');
  }


  watchPosition() {
    let desLat = 0;

    let currentLocation = navigator.geolocation.watchPosition(position => {
      if (position.coords.latitude === desLat) navigator.geolocation.clearWatch(currentLocation);
    }, (err) => { console.log(err); }, {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    });
  }


  group4g = L.featureGroup();
  group5g = L.featureGroup();

  switchFilter(v: boolean, type: string) {

    if (v) {
      if (type === '4g') this.map.addLayer(this.group4g);
      if (type === '5g') this.map.addLayer(this.group5g);

    } else {
      if (type === '4g') this.map.removeLayer(this.group4g);
      if (type === '5g') this.map.removeLayer(this.group5g);
    }
  }


  mappingMap(data: MapData[], group: any, HEXcolor: string, label: string) {
    data.forEach(item => {
      L.circle([item.latitude, item.longitude], {
        color: HEXcolor,
        stroke: false,
        radius: 200,
        fillOpacity: 0.7,
      }).addTo(group).on('click', () => {
        this.setinfoService.setSiteId(item.site_id);
        this.setinfoService.setTypeMap(item.type_map);
        this.setinfoService.setStatus((item.status !== undefined) ? item.status : 'Data is not available')
        this.setinfoService.setSignal(label);
      });
    });
  }

}
