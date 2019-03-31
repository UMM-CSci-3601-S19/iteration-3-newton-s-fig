import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import Credentials from '../../../credentials.json';

import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';
import {Ride} from "../rides/ride";
import {User} from "../users/user";
import * as stream from 'getstream';

@Injectable()
export class ChatService {
  readonly baseUrl: string = environment.API_URL + 'chat';
  private API_KEY = (<any>Credentials).API_KEY;
  private client;
  private userId = 'user_id';
  private userToken;

  constructor(private http: HttpClient) {
    this.connectStream();
  }

  sendMessage(message: string, feedId: string) {
    console.log("feedId=" + feedId);
    let rideFeed = this.client.feed('ride', feedId, this.userToken);

    let activity = {
      actor: this.userId,
      verb: "send",
      object: message
    };

    rideFeed.addActivity(activity)
      .then(function(data) {
        console.log("Successfully posted message: " + JSON.stringify(data));
      })
      .catch(function(reason) {
        console.log(reason.error);
      });
  }

  getMessages(feedId: string): Promise {
    this.connectStream();

    let rideFeed = this.client.feed('ride', feedId, this.userToken);

    return new Promise( (resolve, reject) => {
      rideFeed.get().then( feedData => {
        resolve(feedData.results);
      }).catch(reason => {
        console.log(reason.error);
        reject({});
      });
    });
  }

  connectStream() {
    this.getToken({}).subscribe( userToken => {
      this.userToken = userToken;
      this.client = stream.connect(this.API_KEY, userToken,"49831");
      return this.client;
    });
  }

  checkStream() {
    if (!this.client) { return this.connectStream(); }
  }

  /**
   * Obtains a token from the server, currently an all-access token that gives this user
   * the ability to create, read, update, and delete any GetStream resource.
   * @param {Object} user
   * @returns {Observable<string>}
   */
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
