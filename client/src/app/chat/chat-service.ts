import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StreamChat} from 'stream-chat';
// import {Chat } from 'stream-chat/src/components/Chat';

import Credentials from '../../../credentials.json';

import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';
import {Ride} from "../rides/ride";

@Injectable()
export class ChatService {

  private API_KEY = (<any>Credentials).API_KEY;
  private API_KEY_SECRET = (<any>Credentials).API_KEY_SECRET;
  private chatClient = new StreamChat(this.API_KEY, this.API_KEY_SECRET);


  constructor(private http: HttpClient) {
    this.setUser();
  }

   async setUser() {
    const token = this.chatClient.createToken('jlahey');

    await this.chatClient.setUser(
      {
        id: 'jlahey',
        name: 'Jim Lahey',
        image: 'https://i.imgur.com/fR9Jz14.png',
      },
      token
    );
  }

  async createRideChannel(ride: Ride) {
    const channel = this.chatClient.channel('messaging', 'ride_id_here', {
      name: 'Chat for ride going from ' + 'ride.origin' + ' to ' + 'ride.destination',
    });

    let state = await channel.watch();

    const text = 'First test message is this. - Yoda';
    const response = await channel.sendMessage({
      text,
    });

    console.log(response);
  }
}
