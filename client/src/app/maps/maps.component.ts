import {Component, Input, OnInit} from '@angular/core';
import * as scriptjs from 'scriptjs';
declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  @Input() mapHeight: string;
  @Input() lat: number = 45.593614;
  @Input() lng: number = -95.890831;

  constructor() { }

  ngOnInit() {
    document.getElementById('map').style.height = this.mapHeight + 'px';
    scriptjs.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyCSlf2Tw0r3e_oud87Phtzc_afZfFphM6Q", () => {
      this.initMap();
    });
  }

  initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: this.lat, lng: this.lng },
      zoom: 13,
      disableDefaultUI: true
    });
  }
}
