import {environment} from '../../environments/environment';
import {FormControl} from '@angular/forms';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';

import {User} from '../users/user';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

@Injectable()
export class EmailValidator {
  readonly baseUrl: string = environment.API_URL + 'users';
  private userUrl: string = this.baseUrl;

  //private static http: HttpClient = new HttpClient(new HttpHandler);

  constructor() {
  }



//check database to see if the given email exists

  // static emailExists(fc: FormControl){
  //   var result = http.get<User>(environment.API_URL+'users' + '?email=' + fc.value);
  //   console.log(result);
  //   console.log("hello");
  //
  //   if (result != null) {
  //     return ({
  //       existingEmail: true,
  //     });
  //   } else {
  //     return null;
  //   }
  // }

  // existingEmail(fc: FormControl) {
  //   if (this.emailExists(fc)) {
  //     return ({
  //       existingEmail: true,
  //     });
  //   } else {
  //       return({existingEmail: false});
  //
  //   }
  // }
}
