import {Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';
import {Marker} from "../maps/marker";

declare var google;

@Component({
  selector: 'app-mapsSearch',
  templateUrl: './mapsSearch.component.html',
  styleUrls: ['./mapsSearch.component.css']
})
export class MapsSearchComponent implements OnInit{
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() searchControl: FormControl;
  @Input() zoom: number;
  public markers: Marker[];
  mapsSearchInput: string;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    //set google maps defaults
    this.zoom = 14;
    this.latitude = 45.5919;
    this.longitude = -95.9189;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          let m: Marker = {
            latitude: this.latitude,
            longitude: this.longitude,
            label: ""
          };
          this.markers = [];
          this.markers.push(m);
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  clearInput() {
    this.mapsSearchInput = "";
  }
}
