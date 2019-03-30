import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {LoginComponent} from "./login.component";
import {CustomModule} from '../custom.module';

describe('Login component', () => {

  let loginComponent: LoginComponent;
  let calledClose: boolean;

  const mockMatDialogRef = {
    close() {
      calledClose = true;
    }
  };
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CustomModule],
      declarations: [LoginComponent],
      providers: [
        {provide: MatDialogRef, useValue: mockMatDialogRef},
        {provide: MAT_DIALOG_DATA, useValue: null}
      ]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    calledClose = false;
    fixture = TestBed.createComponent(LoginComponent);
    loginComponent = fixture.componentInstance;
    loginComponent.ngOnInit();

  });

  // Much of the code for validation was created with helpful resources including:
  // https://codecraft.tv/courses/angular/unit-testing/model-driven-forms/

  it('form invalid when empty', () => {
    expect(loginComponent.loginForm.valid).toBeFalsy();
  });

  it('email field invaild when non-email input', () => {
    let errors = {};
    let email = loginComponent.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeTruthy();
  });

  it('email field vaild when email input', () => {
    let errors = {};
    let email = loginComponent.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();
  });
  
});
