import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
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
  @Input() searchPlaceholder: string;
  formGroup: FormGroup;

  @Output() placeResult = new EventEmitter<google.maps.places.PlaceResult>();

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    //create search FormControl
    this.formGroup = this.fb.group({
      search: ['']
    });

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          this.placeResult.emit(autocomplete.getPlace());
        });
      });
    });
  }
}
