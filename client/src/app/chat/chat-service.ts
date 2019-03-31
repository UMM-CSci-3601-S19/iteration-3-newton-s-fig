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
  private API_KEY_SECRET = (<any>Credentials).API_KEY_SECRET;

  constructor(private http: HttpClient) {
    this.connectStream();
  }

  async connectStream() {
    const user = {
      _id: 'avery'
    };

    this.getToken(user).subscribe( userToken => {
      const client = stream.connect(this.API_KEY, userToken,"49831");
    });
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
