import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mongo-Angular-Spark lab';


  public text: string;

  private email: string;

  public clearStorage(){
    localStorage.setItem('user','');
    location.reload();
  }

  constructor() {


    //setInterval(function() {
      if(localStorage.getItem('user')){
        this.email=JSON.parse(localStorage.getItem('user')).email;
        this.text = "User: '" + this.email + "', is logged in.";
      }
      else{
        this.text = "Not logged in.";
      }
      
    //}, 1000);


  }






}
