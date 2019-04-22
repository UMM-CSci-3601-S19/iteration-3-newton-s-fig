import {Component, ElementRef, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
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
  @Input() placeResult: google.maps.places.PlaceResult;
  @Input() searchPlaceholder: string;
  @Input() location: string;
  formGroup: FormGroup;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    //set google maps defaults
    // this.latitude = 45.5919;
    // this.longitude = -95.9189;

    //create search FormControl
    this.formGroup = this.fb.group({
      search: ['']
    });

    //set current position
    // this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          this.placeResult = autocomplete.getPlace();
          console.log(JSON.stringify(this.placeResult));

          localStorage.setItem(this.location, JSON.stringify(this.placeResult));




          //
          // //verify result
          // if (place.geometry === undefined || place.geometry === null) {
          //   return;
          // }
          //
          // //set latitude, longitude
          // this.latitude = place.geometry.location.lat();
          // this.longitude = place.geometry.location.lng();
          // this.mapsSearchInput = place.name;
          // console.log(this.latitude);
          // console.log(this.longitude);
          // console.log(this.mapsSearchInput);
        });
      });
    });
  }

  // private setCurrentPosition() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //     });
  //   }
  // }
}
