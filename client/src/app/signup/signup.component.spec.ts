import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SignupComponent} from "./signup.component";
import {CustomModule} from '../custom.module';
import {Observable} from "rxjs/Observable";
import {User} from "../users/user";
import {UserListService} from "../users/user-list.service";
import {Router} from "@angular/router";

describe('Signup component', () => {

  let signupComponent: SignupComponent;

  let errors;
  let email;
  let name;
  let phone;

  let fixture: ComponentFixture<SignupComponent>;

  let userListServiceStub: {
    getUsers: () => Observable<User[]>
  };





  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [SignupComponent],
      providers: [
        {provide: UserListService, useValue: userListServiceStub},
        {provide: Router}
        ]

    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    // stub UserService for test purposes
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

    fixture = TestBed.createComponent(SignupComponent);
    signupComponent = fixture.componentInstance;
    signupComponent.ngOnInit();



    errors = {};
    email = signupComponent.signupForm.controls['email'];
    name = signupComponent.signupForm.controls['name'];
    phone = signupComponent.signupForm.controls['phone'];
  });

  // Much of the code for validation was created with helpful resources including:
  // https://codecraft.tv/courses/angular/unit-testing/model-driven-forms/

  it('form invalid when empty', () => {
    expect(signupComponent.signupForm.valid).toBeFalsy();
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

  it('name field invaild when input contains bad characters', () => {
    name.setValue("j89389h@");
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();
  });

  it('name field vaild when valid name input', () => {
    name.setValue("Bob");
    errors = name.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

});
