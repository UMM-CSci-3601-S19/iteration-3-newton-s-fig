import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from "@angular/platform-browser";
import {MapsAPILoader} from "@agm/core";
import {RideListService} from "../rides/ride-list.service";
import {Ride} from "../rides/ride";
import {FilterService} from "./filter.service";
import {Marker} from "../maps/marker";

@Component({
  selector: 'filter-component',
  templateUrl: 'filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  public departureDate: string;
  public rideDestination: google.maps.places.PlaceResult;
  public rideOrigin: google.maps.places.PlaceResult;
  public originRadius: number;
  public destinationRadius: number;

  public markers: Marker[] = [];


  constructor(private mapsAPILoader: MapsAPILoader,
              public rideListService: RideListService,
              private _formBuilder: FormBuilder,
              private titleService: Title,
              public  filterService: FilterService) {
    this.titleService.setTitle("Find a Ride");
  }

  todaysDate(): Date {
    return new Date();
  }

  submit() {
    console.log(this.rideOrigin, this.rideDestination, this.originRadius, this.destinationRadius,this.departureDate);
    this.filterService.updateFilter(
      this.rideOrigin, this.rideDestination, this.originRadius, this.destinationRadius,this.departureDate);
  }

  reset(){
    this.departureDate= null;
    this.rideDestination= null;
    this.rideOrigin= null;
  }

  setRideOrigin(placeResult: google.maps.places.PlaceResult) {
    this.rideOrigin = placeResult;
    let m: Marker = {
      longitude: placeResult.geometry.location.lng(),
      latitude: placeResult.geometry.location.lat(),
      label: 'A'
    };
    this.markers[0] = m;
    this.markers = this.markers.slice();
  }

  setRideDestination(placeResult: google.maps.places.PlaceResult) {
    this.rideDestination = placeResult;
    let m: Marker = {
      longitude: placeResult.geometry.location.lng(),
      latitude: placeResult.geometry.location.lat(),
      label: 'B'
    };
    this.markers[1] = m;
    this.markers = this.markers.slice();
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      departureDate: new FormControl('departureDate')
    });
    this.secondFormGroup = this._formBuilder.group({
      origin: new FormControl('origin'),
      originRadius: new FormControl('originRadius')
    });
    this.thirdFormGroup = this._formBuilder.group({
      destination: new FormControl('destination'),
      destinationRadius: new FormControl('destinationRadius')
    });
      this.originRadius = 20;
      this.destinationRadius = 20;
  }
}
