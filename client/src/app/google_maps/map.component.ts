import {Component} from '@angular/core';

@Component({
  selector: 'map-component',
  templateUrl: 'map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent {
  latitude = 45.5919;
  longitude = -95.9189;
  mapType = 'roadmap'
}
