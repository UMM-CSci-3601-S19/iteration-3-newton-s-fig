import {Component, Input, OnInit} from '@angular/core';
import {Ride} from "./ride";
import {MatDialog} from "@angular/material";
import {ChatComponent} from "../chat/chat.component";

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.scss']
})
export class RideComponent implements OnInit {
  @Input() ride: Ride;

  constructor(public dialog: MatDialog) { }

  openChat(rideId: string): void {
    const dialogRef = this.dialog.open(ChatComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
    dialogRef.componentInstance.feedId = rideId;
  }

  dateMonth(string: string): string {
    var pre = string;
    var post = pre.split(" ");
    return post[0].substring(0,3);
  }

  dateDay(string: string): string {
    var pre = string;
    var post = pre.split(" ");
    return post[1];
  }

  ngOnInit() {
  }

}
