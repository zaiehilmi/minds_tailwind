import { Component, OnInit } from '@angular/core';

import { ToggleService } from 'src/app/toggle.service';

declare const L: any;

@Component({
  selector: 'app-twentythree',
  templateUrl: './twentythree.component.html',
  styleUrls: ['./twentythree.component.css'],
  providers: [ToggleService],
})
export class TwentythreeComponent implements OnInit {

  constructor(public dropdown: ToggleService) { }

  openDropdown($event: Event) {
    $event.preventDefault();

    this.dropdown.toggleDropdown();
  }

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
      console.log(`lat: ${position.coords.latitude} lng: ${position.coords.longitude}`);

      if (position.coords.latitude === desLat) navigator.geolocation.clearWatch(currentLocation);
    }, (err) => { console.log(err); }, {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    });
  }
}
