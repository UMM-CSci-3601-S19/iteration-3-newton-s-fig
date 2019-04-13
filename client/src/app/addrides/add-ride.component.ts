import {Component, Inject, OnInit} from '@angular/core';
import {Ride} from '../rides/ride';
import {FormControl, Validators, FormGroup, FormBuilder, AbstractControl} from "@angular/forms";
import {RideListComponent} from "../rides/ride-list.component";
import {RideListService} from "../rides/ride-list.service";
import {Observable} from "rxjs/Observable";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'add-ride.component',
  templateUrl: 'add-ride.component.html',
  styleUrls: ['./add-ride.component.scss'],
  providers: [RideListComponent],
})

export class AddRideComponent implements OnInit {

  public rides: Ride[];

  private highlightedID: string = '';

  public addRideForm: FormGroup;

  public rideDriver: string;
  public rideNotes: string;
  public rideSeats: number;
  public rideOrigin: string;
  public rideDestination: string;
  public rideDepartureDate: string;
  public rideDepartureTime: string;
  public rideDateObject: string;
  public nowDate: Date;

  // Inject the RideListService into this component.
  constructor(public rideListService: RideListService,
              private fb: FormBuilder,
              private titleService: Title) {
    titleService.setTitle("Offer Ride");
  }

  add_ride_validation_messages = {
    'driver': [
      {type: 'required', message: 'Please enter your name'},
      {type: 'minlength', message: 'Please enter your full name'},
      {type: 'pattern', message: 'Please enter a valid name'}
    ],

    'seatsAvailable': [
      {type: 'required', message: 'Please specify how many seats you\'re offering'},
      {type: 'min', message: 'Please offer at least 1 seat'},
      {type: 'max', message: 'Can\'t offer more than 12 seats'},
    ],

    'origin': [
      {type: 'required', message: 'Origin is required'}
    ],

    'destination': [
      {type: 'required', message: 'Destination is required'}
    ]
  };


  todaysDate(): Date {
    this.nowDate = new Date();
    return this.nowDate;
  }

  addRide(): void {
    const newRide: Ride = {
      _id: '',
      driver: this.rideDriver,
      notes: this.rideNotes,
      seatsAvailable: Number(this.rideSeats),
      origin: this.rideOrigin,
      destination: this.rideDestination,
      departureDate: this.rideDepartureDate,
      departureTime: this.rideDepartureTime,
      dateObject: this.rideDateObject
    };


    console.log(newRide);
    if (newRide != null) {
      this.rideListService.addNewRide(newRide).subscribe(
        result => {
          this.highlightedID = result;

        },
        err => {
          // This should probably be turned into some sort of meaningful response.
          console.log('There was an error adding the ride.');
          console.log('The newRide or dialogResult was ' + newRide);
          console.log('The error was ' + JSON.stringify(err));
        });
      this.refreshRides();
      this.refreshRides();
      this.refreshRides();
      this.refreshRides();
      this.refreshRides();
      this.refreshRides();
      this.refreshRides();
      this.refreshRides();
      //This is the only solution to a refresh-on-addride
      // we were having that worked consistently, it's hacky but seems to work well.
    }
  };

  steps =[
    {label: 'Confrim your name', content: 'Name'},
    {label: 'Confrim your seats', content: '0'},
    {label: 'Confrim your starting point', content: 'Your location'},
    {label: 'Confrim your destination', content: 'Going place'},
    {label: 'Confrim your departure', content: '1/1/1'},
    {label: 'Confrim your time', content: '1:1AM'},
    {label: 'Confrim your note', content: ''},

  ]

  get formArray(): AbstractControl | null { return this.addRideForm.get('formArray'); }
  createForm() {
    this.addRideForm = this.fb.group({
      formArray: this.fb.array([
        this.fb.group({
          driver: ['driver', Validators.compose([
            Validators.required,
            Validators.minLength(2),
            Validators.pattern('^[A-Za-z0-9\\s]+[A-Za-z0-9\\s]+$(\\.0-9+)?')
          ])]
        }),

        this.fb.group({
          seatsAvailable: ['seatsAvailable', Validators.compose([
            Validators.required,
            Validators.min(1),
            Validators.max(12)
          ])]
        }),

        this.fb.group({
          origin: ['origin', Validators.compose([
            Validators.required
          ])]
        }),
        this.fb.group({
          destination: ['destination', Validators.compose([
            Validators.required
          ])]
        }),
        this.fb.group({
          departureDate: ['departureDate', Validators.compose([
            Validators.required
          ])]
        }),
        this.fb.group({
          departureTime: ['departureTime']
        }),
        this.fb.group({
          notes: ['notes']
        })
      ])
    })
  }

  refreshRides(): Observable<Ride[]> {
    // Get Rides returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)
    const rides: Observable<Ride[]> = this.rideListService.getRides();
    rides.subscribe(
      rides => {
        this.rides = rides;
      },
      err => {
        console.log(err);
      });
    return rides;
  }


  ngOnInit() {
    this.createForm();
  }

}

