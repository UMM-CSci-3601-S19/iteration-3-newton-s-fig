import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'login.component',
  templateUrl: 'login.component.html'
})


export class LoginComponent implements OnInit {

  public email: string;

  private highlightedID: string = '';

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  login_validation_messages = {
    'email': [{type: 'email', message: 'Email must be formatted properly'}]
  };

  login(): void {
    document.cookie = "email=" + this.email;

  };

  createForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('email', Validators.email)
    })
  }


  ngOnInit() {
    this.createForm();
  }

}
