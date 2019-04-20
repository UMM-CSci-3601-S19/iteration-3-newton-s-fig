import {Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
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
  @Input() mapsSearchInput: string;
  @Input() searchPlaceholder: string;
  @Input() group: FormGroup;
  formgroup: FormGroup;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.formgroup=this.group;
    //set google maps defaults
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

          //set latitude, longitude
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }
}
