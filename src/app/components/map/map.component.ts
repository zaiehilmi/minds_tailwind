import { Component, OnInit } from '@angular/core';

declare const L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition(position => {
      const coords = position.coords;

      let map = L.map('map').setView([coords.latitude, coords.longitude], 13);
      console.log(map)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      let marker = L.marker([coords.latitude, coords.longitude]).addTo(map);
      marker.bindPopup('<b>You are here</b><br>lat: ' + coords.latitude + '<br>lng: ' + coords.longitude).openPopup();
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
}
