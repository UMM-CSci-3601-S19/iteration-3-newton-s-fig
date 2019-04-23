import {Component, Input, OnInit} from '@angular/core';
import {Ride} from "./ride";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {ChatComponent} from "../chat/chat.component";

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {

  @Input() ride: Ride;

  constructor(public dialog: MatDialog) { }

  openChat(rideId: string): void {
    const dialogRef = this.dialog.open(ChatComponent, <MatDialogConfig>{
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
    dialogRef.componentInstance.feedId = rideId;
  }

  ngOnInit() {
  }

}
