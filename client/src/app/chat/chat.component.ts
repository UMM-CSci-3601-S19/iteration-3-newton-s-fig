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

  // feedId is set in the ride-list component when the chat dialog is opened.
  public feedId: string;
  public messages: string[] = [];

  public messageToSend: string;
  public sendMessageForm = new FormGroup({
    messageToSend: new FormControl()
  });

  constructor(public chatService: ChatService) { }

  public sendMessage() {
    this.chatService.sendMessage(this.messageToSend, this.feedId);
  }

  public getMessages() {
    this.chatService.getMessages(this.feedId).then(feedData => {
      let i;
      for (i = 0; i < feedData.length; i++) {
        this.messages.push(feedData[i].object);
      }
      console.log("Processed messages are: " + this.messages);
    });
  }

  ngOnInit() {
    this.getMessages();
  }

}
