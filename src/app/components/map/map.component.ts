import { Component, OnInit, Output } from '@angular/core';
import { GetInfoService } from 'src/app/services/get-info.service';
import { ReadApiService } from 'src/app/services/read-api.service';
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

  constructor(
    private readApiService: ReadApiService,
    private setinfoService: GetInfoService,
  ) { }

  ngOnInit() {
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

      let map = L.map('map').setView([coords.latitude, coords.longitude], 13);
      console.log(map)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      setTimeout(() => {
        this.mappingMap4g(this.data4g, map);
        this.mappingMap5g(this.data5g, map)
      }, 1000);

    });

    this.watchPosition();
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

  mappingMap4g(data: MapData[], map: any) {
    data.forEach(item => {
      L.circle([item.latitude, item.longitude], {
        color: '#20B2AA',
        stroke: false,
        radius: 200,
        fillOpacity: 0.7,
      }).addTo(map).on('click', () => {
        this.setinfoService.setSiteId(item.site_id);
        this.setinfoService.setTypeMap(item.type_map);
        this.setinfoService.setStatus(item.status);
        this.setinfoService.setSignal('4G');
      });
    });
  }

  mappingMap5g(data: MapData[], map: any) {
    data.forEach(item => {
      L.circle([item.latitude, item.longitude], {
        color: '#ff3535',
        stroke: false,
        radius: 200,
        fillOpacity: 0.7,
      }).addTo(map).on('click', () => {
        this.setinfoService.setSiteId(item.site_id);
        this.setinfoService.setTypeMap(item.type_map);
        this.setinfoService.setStatus('Data is not provided');
        this.setinfoService.setSignal('5G');
      });
    });
  }

}
