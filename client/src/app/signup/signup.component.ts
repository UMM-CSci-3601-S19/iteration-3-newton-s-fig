import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import {User} from "../users/user";
import {UserListService} from "../users/user-list.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'signup.component',
  templateUrl: 'signup.component.html'
})


export class SignupComponent implements OnInit {

  public email: string;

  public name: string;

  public phone: string;

  public user;

  private highlightedID: string = '';

  public signupForm: FormGroup;

  constructor(private userListService: UserListService,
              private fb: FormBuilder,
              private router: Router,
              private titleService: Title) {
    titleService.setTitle("Sign Up");
  }

  signup_validation_messages = {
    'email': [
      {type: 'email', message: 'Email must be formatted properly'},
      {type: 'required', message: 'Name is required'}
    ],
    'name': [
      {type: 'required', message: 'Name is required'},
      {type: 'minlength', message: 'Name must be at least 2 characters long'},
      {type: 'maxlength', message: 'Name cannot be more than 25 characters long'},
      {type: 'pattern', message: 'Name must contain only numbers and letters'}
    ]
  };

  signup(): void {
    const newUser: User = {
      _id: '',
      email: this.email,
      phone: this.phone,
      name: this.name
    };


    if(localStorage.user){
      alert("You are already logged in.");

    }else {
      this.userListService.getUserByEmail(this.email).subscribe(
        result => {
          this.user = result[0];
          console.log(this.user);
          if (this.user) {
            alert("The entered email is already taken.");
          } else {
            localStorage.user = JSON.stringify(newUser);
            this.addUser(newUser);
          }
        },
        err => {
          // This should probably be turned into some sort of meaningful response.
          console.log('There was an error signing up.');
          console.log('The email or dialogResult was ' + this.email);
          console.log('The error was ' + JSON.stringify(err));
        });
    }

  }

  addUser(newUser) {

    if (newUser != null) {
      this.userListService.addNewUser(newUser).subscribe(
        result => {
          this.highlightedID = result;
          location.assign("http://"+location.host+"/rides");
        },
        err => {
          // This should probably be turned into some sort of meaningful response.
          console.log('There was an error adding the user.');
          console.log('The newUser or dialogResult was ' + newUser);
          console.log('The error was ' + JSON.stringify(err));
        });

    }
  }


  //we need to check if email is not already in the database




  createForm() {
    this.signupForm = this.fb.group({
      email: new FormControl('email', Validators.compose([
        Validators.email,
        Validators.required
      ])),
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
