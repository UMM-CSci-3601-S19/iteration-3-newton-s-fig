import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {environment} from '../../environments/environment';


@Injectable()
export class ChatService {
  private API_KEY = require('./credentials.json').get("API_KEY");

  constructor(private http: HttpClient) {
  }
}
