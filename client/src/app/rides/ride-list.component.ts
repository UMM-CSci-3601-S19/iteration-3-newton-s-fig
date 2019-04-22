import {Component, OnInit} from '@angular/core';
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
              public filterService: FilterService) {
    filterService.addListener(this);
    titleService.setTitle("Upcoming Rides");
    chatService.connectStream();
  }

  // public noRidesFound(): string {
  //   var ridesText = "Sorry, we didn't find any rides on that day!";
  //   if (this.rides.length > 0) {
  //     ridesText = null;
  //   }
  //   return ridesText;
  // }

  ngOnInit(): void {
  }
}
