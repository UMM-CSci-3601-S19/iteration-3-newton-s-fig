import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  constructor() {}
  // ...
  public isAuthenticated(): boolean {
    return true; //JSON.parse(localStorage.getItem('user'));
  }
}
