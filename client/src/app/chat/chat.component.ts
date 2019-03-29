import { Component, OnInit } from '@angular/core';
import {ChatService} from "./chat-service";

import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: []
})
export class ChatComponent implements OnInit {

  public messageToSend: string;
  public sendMessageForm = new FormGroup({
    messageToSend: new FormControl()
  });

  constructor(public chatService: ChatService) { }

  public sendMessage() {

  }

  ngOnInit() {
  }

}
