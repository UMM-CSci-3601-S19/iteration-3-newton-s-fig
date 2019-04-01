import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from "@angular/forms";
import {User} from "../users/user";
import {UserListService} from "../users/user-list.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login.component',
  templateUrl: 'login.component.html'
})


export class LoginComponent implements OnInit {

  public email: string;

  public phone: string;

  public name: string;

  private user;

  private highlightedID: string = '';

  public loginForm: FormGroup;

  constructor(private userListService: UserListService, private fb: FormBuilder, private router: Router) {

  }

  login_validation_messages = {
    'email': [{type: 'email', message: 'Email must be formatted properly'}]
  };

  login(): void {

    if(localStorage.user){
      alert("You are already logged in.");

    }else {
      localStorage.user = null;
      if (this.email != null && this.email != "") {
        this.userListService.getUserByEmail(this.email).subscribe(
          result => {
            this.user = result[0];
            if (this.user) {
              localStorage.user = JSON.stringify(this.user);
              location.assign("http://"+location.host+"/rides");
            } else {
              this.router.navigate(['login']);
              alert("The entered email is not associated with any user. Did you enter your email correctly?");
            }
          },
          err => {
            // This should probably be turned into some sort of meaningful response.
            console.log('There was an error logging in.');
            console.log('The email or dialogResult was ' + this.email);
            console.log('The error was ' + JSON.stringify(err));
          });

      }
      ;
    }

  }

  createForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('email', Validators.email)
    })
  }


  ngOnInit() {
    this.createForm();
  }

}
