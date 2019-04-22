import {Injectable} from "@angular/core";
import {RideListComponent} from "../rides/ride-list.component";
import {Ride} from "../rides/ride";
import {MapsAPILoader} from "@agm/core";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable
export class FilterService {

  rideListComponent: RideListComponent;

  readonly baseUrl: string = environment.API_URL + 'rides';
  private rideUrl: string = this.baseUrl;

  // public so that tests can reference them (.spec.ts)
  public rides: Ride[];
  public filteredRides: Ride[] = [];
  public unfilteredRides: Ride[];
  public array: Ride[];
  public time: Date;
  public timeString: string;
  public nowDate = new Date;
  public radius: number;
  public service;

  public destinationArray: google.maps.Place[];
  //public rideDist;

  // Variables used for filtering
  public rideDateObject: string;
  // '2014-11-03T19:38:34.203Z'
  public date: Date;
  public utcDate: Date;

  constructor(private http: HttpClient,
              private mapsAPILoader: MapsAPILoader) {}

  addListener(rlc: RideListComponent) {
    this.rideListComponent = rlc;
  }

  updateList(rides: Ride[]) {
    if (this.rideListComponent) {
      this.rideListComponent.rides = rides;
    }
  }

  private getRides(): Observable<Ride[]> {
    return this.http.get<Ride[]>(this.rideUrl);
  }

  public filterLocation(radius: number, location, property: string): void {
    console.log("filtering by location");

    this.radius = radius;
    console.log(this.radius);
    //var service = google.maps.DistanceMatrixService();
    this.service = new google.maps.DistanceMatrixService();
    this.destinationArray = [];
    var validRides = [];

    for (let r of this.filteredRides) {
      if(r[property].geometry) {
        validRides.push(r);
        this.destinationArray.push(r[property].geometry.location);
      }
    }
    this.filteredRides = validRides;

    console.log(this.destinationArray);
    console.log(this.radius);

    this.service.getDistanceMatrix({
        origins: [location.geometry.location],
        destinations: this.destinationArray,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        travelMode: 'DRIVING'
      },
      function(response, status){
        console.log(this.radius);
        if (status == 'OK') {
          var origins = response.originAddresses;
          var rides = [];

          console.log("filtering rides");

          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            console.log(results);
            for (var j = 0; j < results.length; j++) {
              var element = results[j];
              console.log(element);
              if(element.status =='OK') {
                var distance = element.distance.text;
                console.log(distance);
                var unit = distance.split(" ")[1];
                distance = parseInt(distance.split(" ")[0]);
                console.log(distance);
                console.log(radius);
                console.log(distance <= radius || unit =="ft");
                //this.rideDist.push(distance);
                if (distance <= radius) {
                  console.log(j);
                  console.log(validRides);
                  rides.push(validRides[j]);
                }
              }

            }
            console.log(rides);
          }
          this.filteredRides = rides;

        }
      }
    );

  }

  // public callback(response, status, radius): void {
  //   console.log(this.radius);
  //   if (status == 'OK') {
  //     var origins = response.originAddresses;
  //     var destinations = response.destinationAddresses;
  //     var rides = [];
  //
  //     console.log("filtering rides");
  //
  //     for (var i = 0; i < origins.length; i++) {
  //       var results = response.rows[i].elements;
  //       for (var j = 0; j < results.length; j++) {
  //         var element = results[j];
  //         var distance = element.distance.text;
  //         distance = parseInt(distance.split(" ")[0]);
  //         console.log(distance);
  //         console.log(radius);
  //         console.log(distance <= radius);
  //         //this.rideDist.push(distance);
  //         if (distance <= this.radius) {
  //           rides.push(this.filteredRides[j]);
  //         }
  //         console.log(rides);
  //
  //       }
  //     }
  //     this.filteredRides = rides;
  //
  //   }
  // }

  public filterDestination(): void {
    var destinationRadius = parseInt(localStorage.getItem("destinationRadius"));
    var destination = localStorage.getItem("filterDestination");
    var destinationJSON = JSON.parse(destination);
    this.filterLocation(destinationRadius, destinationJSON, "destination");
  }

  public filterOrigin(): void {
    var originRadius = parseInt(localStorage.getItem("originRadius"));
    console.log(originRadius);
    var origin = localStorage.getItem("filterOrigin");
    var originJSON = JSON.parse(origin);
    this.filterLocation(originRadius, originJSON, "origin");
  }

  public filterDate(): void {
    var nowDate = new Date();
    nowDate.setHours(nowDate.getHours() - 8);
    var searchDate = localStorage.getItem("filterDate");
    this.date = new Date(searchDate);
    console.log(this.date);

    // Filter by departure time
    if (searchDate != null) {
      this.array = this.rides;
      console.log(this.filteredRides);
      this.filteredRides = this.filteredRides.filter(ride => {
        return !searchDate || (new Date(ride.dateObject).getUTCFullYear() == this.date.getUTCFullYear() &&
          new Date(ride.dateObject).getUTCMonth() == this.date.getUTCMonth() &&
          new Date(ride.dateObject).getUTCDate() == this.date.getUTCDate()
        );
      });
      console.log(this.filteredRides);
      this.unfilteredRides = this.rides.filter(ride => {
        return !searchDate || !(new Date(ride.dateObject).getUTCFullYear() == this.date.getUTCFullYear() &&
          new Date(ride.dateObject).getUTCMonth() == this.date.getUTCMonth() &&
          new Date(ride.dateObject).getUTCDate() == this.date.getUTCDate()
        );
      });
      console.log(this.unfilteredRides);
      this.unfilteredRides = this.unfilteredRides.filter(ride => {
        return (new Date(ride.dateObject).getTime() >= nowDate.getTime());
      });

      this.unfilteredRides = this.unfilteredRides.sort(function(a,b) {
        return Math.abs((+new Date(a.dateObject) - +new Date(searchDate))) - Math.abs((+new Date(b.dateObject) - +new Date(searchDate)));
      });

      console.log(this.unfilteredRides);
    }

    this.filteredRides = this.filteredRides.filter(ride => {
      return (new Date(ride.dateObject).getTime() >= nowDate.getTime());
    });
    console.log(this.filteredRides);

    this.filteredRides.sort(function(a,b) {return +new Date(a.dateObject) - +new Date(b.dateObject);
    });
    console.log(this.filteredRides);
  }


  public filterRides(): void {

    this.filteredRides = this.rides;
    this.unfilteredRides = <Ride[]>{};

    if (localStorage.getItem("filterDate")) {
      this.filterDate();
    }
    this.mapsAPILoader.load().then(() => {

      if (localStorage.getItem("filterOrigin")) {
        this.filterOrigin();
      }
      if (localStorage.getItem("filterDestination")) {
        this.filterDestination();
      }
    });

  }
}
