import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MoRide';


  public text: string;

  private email: string;

  public clearStorage(){
    localStorage.removeItem('user');
    location.reload();
  }

  constructor(public titleService: Title) {
    titleService.setTitle("MoRide");

      if(localStorage.getItem('user')){
        if(localStorage.getItem('user')=="null"){
          localStorage.removeItem('user');
          this.text = "Not logged in.";
        }else {
          this.email = JSON.parse(localStorage.getItem('user')).email;
          this.text = "User: '" + this.email + "', is logged in.";
        }
      }
      else{
        this.text = "Not logged in.";
      }
  }
}
