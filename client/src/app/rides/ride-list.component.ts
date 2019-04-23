import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {RideListService} from './ride-list.service';
import {Ride} from './ride';
import {Observable} from 'rxjs/Observable';
import {ChatComponent} from "../chat/chat.component";
import {MatDialog} from '@angular/material';
import {ChatService} from "../chat/chat-service";
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';

import {Title} from "@angular/platform-browser";
import {FilterService} from "../filter/filter.service";
import {HttpClient} from "@angular/common/http";




@Component({
  selector: 'ride-list-component',
  templateUrl: 'ride-list.component.html',
  styleUrls: ['./ride-list.component.scss']
})

export class RideListComponent implements OnInit {

  public rides: Ride[];

  // Inject the RideListService into this component.
  constructor(public chatService: ChatService,
              private titleService: Title,
              public filterService: FilterService,
              private changeDetector: ChangeDetectorRef) {
    filterService.addListener(this);
    titleService.setTitle("Upcoming Rides");
    chatService.connectStream();
  }

  setRides(rides: Ride[]) {
    this.rides = rides;
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
  }
}
