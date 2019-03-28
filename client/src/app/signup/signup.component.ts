import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'signup.component',
  templateUrl: 'signup.component.html'
})


export class SignupComponent implements OnInit {

  public email: string;

  public name: string;

  public phone: string;

  private highlightedID: string = '';

  public signupForm: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  login_validation_messages = {
    'email': [{type: 'email', message: 'Email must be formatted properly'}],
    'name': [
      {type: 'required', message: 'Name is required'},
      {type: 'minlength', message: 'Name must be at least 2 characters long'},
      {type: 'maxlength', message: 'Name cannot be more than 25 characters long'},
      {type: 'pattern', message: 'Name must contain only numbers and letters'}
    ]
  };

  signup(): void {

    //add a post request to add this user
    document.cookie = "email=" + this.email;

  };

  createForm() {
    this.signupForm = this.fb.group({
      email: new FormControl('email', Validators.email),
      phone: new FormControl('phone'),
      name: new FormControl('name', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(25),
        Validators.pattern('^[A-Za-z0-9\\s]+[A-Za-z0-9\\s]+$(\\.0-9+)?'),
        Validators.required
      ]))
    })
  }


  ngOnInit() {
    this.createForm();
  }

}
