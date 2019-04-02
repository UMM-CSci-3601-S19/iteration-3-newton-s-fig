import { Component, OnInit, Input } from '@angular/core';
import {Message} from "./message";
import {User} from "../users/user";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;
  private loggedInUser: User = JSON.parse(localStorage.user);
  private fromLoggedInUser: boolean;

  constructor() {
  }

  ngOnInit() {
    this.fromLoggedInUser = this.message.from.email == this.loggedInUser.email;
    console.log("logged in user: " + this.loggedInUser.email);
    console.log("message's user: " + this.message.from.email);
    console.log("fromLoggedInUser for message \"" + this.message.body + "\" = " + this.fromLoggedInUser);
  }
}
