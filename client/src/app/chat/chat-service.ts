import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StreamChat} from 'stream-chat';
// import {Chat } from 'stream-chat/src/components/Chat';

import Credentials from '../../../credentials.json';

import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';

@Injectable()
export class ChatService {

  private API_KEY = (<any>Credentials).API_KEY;
  private client = new StreamChat(this.API_KEY);


  constructor(private http: HttpClient) {

  }
}
