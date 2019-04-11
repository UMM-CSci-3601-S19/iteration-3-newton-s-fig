import {Component} from '@angular/core';

@Component({
  selector: 'map-component',
  templateUrl: 'map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class mapComponent {
  latitude = 45.5919;
  longitude = 95.9189;
  mapType = 'satellite'
}
