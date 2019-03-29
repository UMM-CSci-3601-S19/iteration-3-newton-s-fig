import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  constructor() {}
  // ...
  public isAuthenticated(): boolean {
    const email = localStorage.getItem('email');
    // Check whether the token is expired and return
    // true or false
    console.log(email);
    return email!=""&&email!=null;
  }
}
