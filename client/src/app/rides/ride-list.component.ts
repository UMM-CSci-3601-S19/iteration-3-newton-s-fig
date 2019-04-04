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
