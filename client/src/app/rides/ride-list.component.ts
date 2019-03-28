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
    var date = new Date(searchDate);
    // Filter by destination
    if (searchDate != null) {
      this.filteredRides = this.filteredRides.filter(ride => {
        return !searchDate || (new Date(ride.dateObject).getFullYear() == date.getFullYear() &&
                               new Date(ride.dateObject).getMonth() == date.getMonth() &&
                               new Date(ride.dateObject).getDate() == date.getDate());
      });
    }
    return this.filteredRides;
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
        this.filterRides(this.rideDateObject);
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
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.refreshRides();
    this.loadService();
  }
}
