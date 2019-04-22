import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Marker} from "./marker";
import {AgmMap} from "@agm/core";
import LatLngBounds = google.maps.LatLngBounds;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnChanges {

  @Input() mapHeightVH: string = "30";
  @Input() lat: number = 45.593614;
  @Input() lng: number = -95.890831;
  @Input() markers: Marker[] = [];
  @Input() zoom: number = 14;

  @ViewChild('agmMap') agmMap: AgmMap;

  constructor() {}

  ngOnInit() {
    document.getElementById("map").style.height = this.mapHeightVH + "vh";
  }

  ngOnChanges() {
    console.log("map changed");
    this.agmMap.mapReady.subscribe(map => {
      const bounds: LatLngBounds = new google.maps.LatLngBounds();
      console.log("existing markers: " + JSON.stringify(this.markers));
      for (const m of this.markers) {
        bounds.extend(new google.maps.LatLng(m.latitude, m.longitude));
        console.log("bounds changed: " + JSON.stringify(bounds));
      }
      map.fitBounds(bounds);
    });
  }
}
