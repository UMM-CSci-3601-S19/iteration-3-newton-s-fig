import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  @Input() mapHeightVH: string;
  @Input() lat: number = 45.593614;
  @Input() lng: number = -95.890831;

  constructor() {}

  ngOnInit() {
    document.getElementById("map").style.height = this.mapHeightVH + "vh";
  }
}
