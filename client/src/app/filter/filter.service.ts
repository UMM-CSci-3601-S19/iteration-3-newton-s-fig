import {Injectable} from "@angular/core";
import {RideListComponent} from "../rides/ride-list.component";
import {Ride} from "../rides/ride";
import {MapsAPILoader} from "@agm/core";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable()
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
  public originRad: number;
  public destRad: number;
  public origin = {geometry: {
    location: {},
    viewport: {
      south: 45.8082531197085,
      west: 15.968338249999988,
      north: 45.8109510802915,
      east: 15.971738449999975
    }
  }};

  public destination;
  public filDate;
  public service;

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

  updateFilter(origin, destination, originRad, destRad, date){
    console.log("in update filter");
    this.origin = origin;
    this.destination = destination;
    this.originRad = originRad;
    this.destRad = destRad;
    this.filDate = date;
    this.filterRides();
  }


  updateList(caller: string) {
    console.log("updateList called by " + caller);
    if (this.rideListComponent) {
      console.log("In if, filteredRides=" + this.filteredRides);
      this.rideListComponent.setRides(this.filteredRides);
    }
  }

  public getRides(): Observable<Ride[]> {
    return this.http.get<Ride[]>(this.rideUrl);
  }

  loadService(): void {
    this.getRides().subscribe(
      rides => {
        this.rides = rides;
        this.filteredRides = this.rides;
        this.filteredRides = this.filteredRides.sort(function(a,b) {
          return +new Date(a.dateObject) - +new Date(b.dateObject)
        });
        console.log(this.filteredRides);
      },
      err => {
        console.log(err);
      }
    );
  }

  public filterLocation(radius: number, location, property: string): void {
    console.log("filtering by location");

    //var service = google.maps.DistanceMatrixService();
    this.service = new google.maps.DistanceMatrixService();
    var destinationArray = [];

    console.log(this.filteredRides);

    this.filteredRides.forEach(e => {
      destinationArray.push(e[property].geometry.location);
    });

    console.log(destinationArray);
    console.log(radius);

    this.service.getDistanceMatrix({
        origins: [location.geometry.location],
        destinations: destinationArray,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        travelMode: 'DRIVING'
      },
      (response, status) => {
        console.log("filteredRides=" + this.filteredRides);
        console.log(radius);
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
                distance = parseInt(distance.split(" ")[0].replace(",",""));
                console.log(distance);
                console.log(radius);
                console.log(distance <= radius || unit =="ft");
                //this.rideDist.push(distance);
                if (distance <= radius || unit =="ft") {
                  console.log(j);
                  console.log(this.filteredRides);
                  rides.push(this.filteredRides[j]);
                }
              }

            }
            console.log(rides);
          }
          this.filteredRides = this.filteredRides.filter(value => rides.indexOf(value) !== -1);
          console.log("post-filter filteredRides=" + this.filteredRides);
          this.updateList(property);
        }
      }
    );

  }

  public filterDestination(): void {
    var destinationRadius = this.destRad;
    console.log(JSON.stringify(this.destination));
    this.filterLocation(destinationRadius, this.destination, "destination");
  }

  public filterOrigin(): void {
    var originRadius = this.originRad;
    console.log(this.origin);
    this.filterLocation(originRadius, this.origin, "origin");
  }

  public filterDate(): void {
    var nowDate = new Date();
    nowDate.setHours(nowDate.getHours() - 8);
    var searchDate = this.filDate;
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
    }

    this.filteredRides = this.filteredRides.filter(ride => {
      return (new Date(ride.dateObject).getTime() >= nowDate.getTime());
    });
    console.log(this.filteredRides);

    this.filteredRides.sort(function(a,b) {return +new Date(a.dateObject) - +new Date(b.dateObject);
    });
    console.log(this.filteredRides);

    this.updateList("filterDate");
  }

  public filterRides(): void {
    console.log("in filterRides");
    this.getRides().subscribe(rides => {
      this.filteredRides = rides;
      this.filteredRides = this.filteredRides.sort(function(a,b) {
        return +new Date(a.dateObject) - +new Date(b.dateObject)
      });

      console.log(this.filteredRides);

      if (this.filDate) {
        this.filterDate();
      }
      if (this.origin) {
        this.filterOrigin();
      }
      if (this.destination) {
        this.filterDestination();
      }
      this.updateList("filterRides");
    },
    err => {
      console.log(err);
    });
  }
}


