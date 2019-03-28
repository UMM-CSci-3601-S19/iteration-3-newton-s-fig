import {environment} from '../../environments/environment';
import {FormControl} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from '../users/user';
import {Injectable} from "@angular/core";

@Injectable()
export class EmailValidator {
  readonly baseUrl: string = environment.API_URL + 'users';
  private userUrl: string = this.baseUrl;
  constructor(private http: HttpClient) {
  }



//check database to see if the given email exists

  // static emailExists(fc: FormControl){
  //   var result = this.http.get<User>(environment.API_URL+'users' + '?email=' + fc);
  //   console.log(result);
  //   return result!="";
  // }

  static existingEmail(fc: FormControl) {
    // if (UserListComponent.existingEmail()) {
    //   return ({
    //     existingEmail: true,
    //   });
    // } else {
    //     return({existingEmail: false});
    //
    // }
  }
}
