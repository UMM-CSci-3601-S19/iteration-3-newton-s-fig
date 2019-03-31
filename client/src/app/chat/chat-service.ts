import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StreamChat} from 'stream-chat';

import Credentials from '../../../credentials.json';

import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';
import {Ride} from "../rides/ride";
import {User} from "../users/user";

@Injectable()
export class ChatService {
  readonly baseUrl: string = environment.API_URL + 'chat';
  private API_KEY = (<any>Credentials).API_KEY;
  private API_KEY_SECRET = (<any>Credentials).API_KEY_SECRET;
  private chatClient = new StreamChat(this.API_KEY);


  constructor(private http: HttpClient) {
    this.setUser();
  }

   async setUser() {
     console.log("API_KEY: " + this.API_KEY);
     console.log("API_KEY_SECRET: " + this.API_KEY_SECRET);

     console.log("disabling auth and permission checks");
     // await this.chatClient.updateAppSettings({ disable_auth_checks: true, });

     console.log("generating a token");
     const token = this.getToken({ _id: "jlahey"}).subscribe( async (token) => {
       console.log("token: " + token);

       console.log("setting a user");
       await this.chatClient.setUser(
         {
           id: 'jlahey',
           name: 'Jim Lahey',
           image: 'https://i.imgur.com/fR9Jz14.png',
         },
         token
       );
       console.log("user was set");

       console.log("creating a channel");
       await this.createRideChannel();
     }); //this.chatClient.devToken('jlahey');
  }

  async createRideChannel(ride?: Ride) {
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

  getToken(user: Object): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };

    return this.http.post<string>(this.baseUrl + "/authenticate", user, httpOptions);
  }
}
