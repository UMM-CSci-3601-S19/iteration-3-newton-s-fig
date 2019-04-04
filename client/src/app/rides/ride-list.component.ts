import {Component, OnInit} from '@angular/core';
import {RideListService} from './ride-list.service';
import {Ride} from './ride';
import {Observable} from 'rxjs/Observable';
import {ChatComponent} from "../chat/chat.component";
import {MatDialog} from '@angular/material';
import {ChatService} from "../chat/chat-service";


@Component({
  selector: 'ride-list-component',
  templateUrl: 'ride-list.component.html',
  styleUrls: ['./ride-list.component.scss'],
  providers: [ChatService]
})

export class RideListComponent implements OnInit {
  // public so that tests can reference them (.spec.ts)
  public rides: Ride[];
  public filteredRides: Ride[] = [];
  public unfilteredRides: Ride[];
  public array:Ride[];
  public time: Date;
  public timeString: string;

  // Variables used for filtering
  public rideDateObject: string;
  // '2014-11-03T19:38:34.203Z'
  public date: Date;
  public utcDate: Date;
  // Inject the RideListService into this component.
  constructor(public rideListService: RideListService,
              public dialog: MatDialog,
              public chatService: ChatService) {
    chatService.connectStream();
  }

  openChat(rideId: string): void {
    const dialogRef = this.dialog.open(ChatComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
    dialogRef.componentInstance.feedId = rideId;
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
    this.unfilteredRides = <Ride[]>{};
    this.date = new Date(searchDate);
    console.log(this.date);
    console.log(this.date.getHours());
    var nowDate = new Date();
    nowDate.setHours(nowDate.getHours() - 8);
    // this.utcDate = new Date(Date.UTC(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate(),
    //   this.date.getUTCHours(), this.date.getUTCMinutes(), this.date.getUTCSeconds()));
    // console.log(this.utcDate);
    // Filter by destination
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

      this.unfilteredRides = this.unfilteredRides.sort(function(a,b) {return +new Date(a.dateObject) - +new Date(b.dateObject)
      });
      console.log(this.unfilteredRides);
    }

    this.filteredRides = this.filteredRides.filter(ride => {
      return (new Date(ride.dateObject).getTime() >= nowDate.getTime());
    });


    return this.filteredRides.sort(function(a,b) {return +new Date(a.dateObject) - +new Date(b.dateObject)
    });
  }

  public noRidesFound(): string {
    var ridesText = "Sorry, we didn't find any rides on that day!";
    if (this.filteredRides.length > 0) {
      ridesText = null;
    }
    return ridesText;
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
