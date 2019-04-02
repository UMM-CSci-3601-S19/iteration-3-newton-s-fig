import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {LoginComponent} from "./login.component";
import {CustomModule} from '../custom.module';
import {Router} from "@angular/router";
import {UserListService} from "../users/user-list.service";
import {Observable} from "rxjs/Observable";
import {User} from "../users/user";

describe('Login component', () => {

  let loginComponent: LoginComponent;
  let calledClose: boolean;

  let errors;
  let email;

  let fixture: ComponentFixture<LoginComponent>;

  let userListServiceStub: {
    getUsers: () => Observable<User[]>
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [LoginComponent],
      providers: [
        {provide: UserListService, useValue: userListServiceStub},
        {provide: Router}
      ]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {

    userListServiceStub = {
      getUsers: () => Observable.of([
        {
          _id: 'chris_id',
          name: 'Chris',
          phone: "1234568521",
          email: 'chris@this.that'
        },
        {
          _id: 'pat_id',
          name: 'Pat',
          phone: "16548965215",
          email: 'pat@something.com'
        },
        {
          _id: 'jamie_id',
          name: 'Jamie',
          phone: "3652148952",
          email: 'jamie@frogs.com'
        }
      ])
    };

    calledClose = false;
    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    loginComponent.ngOnInit();

    errors = {};
    email = loginComponent.loginForm.controls['email'];
  });

  // Much of the code for validation was created with helpful resources including:
  // https://codecraft.tv/courses/angular/unit-testing/model-driven-forms/

  it('form invalid when empty', () => {
    expect(loginComponent.loginForm.valid).toBeFalsy();
    expect(email.valid).toBeFalsy();
  });

  it('email field invaild when non-email input', () => {
    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();
  });

  it('email field vaild when email input', () => {
    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });

});
