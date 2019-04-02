import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {User} from './user';
import {environment} from '../../environments/environment';


@Injectable()
export class UserListService {
  readonly baseUrl: string = environment.API_URL + 'users';
  private userUrl: string = this.baseUrl;

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.userUrl + '/' + id);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.userUrl + '?email=' + email);
  }


  private parameterPresent(searchParam: string) {
    return this.userUrl.indexOf(searchParam) !== -1;
  }

  //remove the parameter and, if present, the &
  private removeParameter(searchParam: string) {
    let start = this.userUrl.indexOf(searchParam);
    let end = 0;
    if (this.userUrl.indexOf('&') !== -1) {
      end = this.userUrl.indexOf('&', start) + 1;
    } else {
      end = this.userUrl.indexOf('&', start);
    }
    this.userUrl = this.userUrl.substring(0, start) + this.userUrl.substring(end);
  }

  addNewUser(newUser: User): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        // We're sending JSON
        'Content-Type': 'application/json'
      }),
      // But we're getting a simple (text) string in response
      // The server sends the hex version of the new user back
      // so we know how to find/access that user again later.
      responseType: 'text' as 'json'
    };

    // Send post request to add a new user with the user data as the body with specified headers.
    return this.http.post<string>(this.userUrl + '/new', newUser, httpOptions);
  }
}
