import {Component, Input, OnInit} from '@angular/core';
import {Ride} from "./ride";

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {

  @Input() ride: Ride;

  constructor() { }

  ngOnInit() {
  }

}
