import {Component, OnInit} from '@angular/core';
import {RideListService} from './ride-list.service';
import {Ride} from './ride';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'ride-list-component',
  templateUrl: 'ride-list.component.html',
  styleUrls: ['./ride-list.component.scss'],
  providers: []
})

export class RideListComponent implements OnInit {
  // public so that tests can reference them (.spec.ts)
  public rides: Ride[];
  public filteredRides: Ride[];
  public time: Date;
  public timeString: string;

  // Variables used for filtering
  public rideDateObject: string;
  // '2014-11-03T19:38:34.203Z'
  public date: Date;
  // Inject the RideListService into this component.
  constructor(public rideListService: RideListService) {
 //   rideListService.addListener(this);
  }

  /**
   * Starts an asynchronous operation to update the rides list
   *
   */
  public getTime(date?: Date): string {
      this.time = new Date();
      this.timeString = (this.time.getMonth() + 1) + "/" + this.time.getDate() + "/" +
                                   this.time.getFullYear() + " at " + this.time.getHours() + ":" +
                          this.time.getMinutes();
      return this.timeString;
  }


  public filterRides(searchDate: string): Ride[] {
    this.filteredRides = this.rides;
    this.date = new Date(searchDate);
    console.log(this.date);
    var d = new Date;
    // Filter by destination
    if (searchDate != null) {
      this.filteredRides = this.filteredRides.filter(ride => {
        return !searchDate || (new Date(ride.dateObject).getFullYear() == this.date.getFullYear() &&
                               new Date(ride.dateObject).getMonth() == this.date.getMonth() &&
                               new Date(ride.dateObject).getDate() == this.date.getDate());
      });
    }
    console.log(this.filteredRides);
    return this.filteredRides.sort(function(a,b) {return +new Date(a.dateObject) - +new Date(b.dateObject)
    });
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
        this.filteredRides = this.filterRides(this.rideDateObject);
        console.log(this.filteredRides);
      },
      err => {
        console.log(err);
      });
    return rides;
  }

  loadService(): void {
    this.rideListService.getRides().subscribe(
      rides => {
        this.rides = rides;
        this.filteredRides = this.rides;
        this.filteredRides = this.filteredRides.sort(function(a,b) {
          return +new Date(a.dateObject) - +new Date(b.dateObject)
        })
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.loadService();
    this.refreshRides();
  }
}
