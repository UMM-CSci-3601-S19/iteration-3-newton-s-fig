import { Component, OnInit } from '@angular/core';
import {ChatService} from "./chat-service";

import {FormControl, FormGroup} from "@angular/forms";
import {Message} from "../message/message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: []
})
export class ChatComponent implements OnInit {

  // feedId is set in the ride-list component when the chat dialog is opened.
  public feedId: string;
  public messages: string[];

  public messageToSend: string;
  public sendMessageForm = new FormGroup({
    messageToSend: new FormControl()
  });

  constructor(public chatService: ChatService) { }

  public sendMessage() {
    if (this.messageToSend.length > 2) {
      this.chatService.sendMessage(this.messageToSend, this.feedId);
      this.messageToSend = "";
      this.getMessages();
      this.getMessages();
    }
  }

  public getMessages() {
    this.chatService.getMessages(this.feedId).then(feedData => {
      this.messages = [];
      let i;
      for (i = 0; i < feedData.length; i++) {
        this.messages.push(feedData[i].object);
      }
      this.messages.reverse();
    });
  }

  ngOnInit() {
    this.getMessages();
  }

}
