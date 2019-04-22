import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'filter-component',
  templateUrl: 'filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  public departureDate: string;
  public rideDestination: string;
  public rideOrigin: string;
  public originRadius: number;
  public destinationRadius: number;


  constructor(private _formBuilder: FormBuilder,
              private titleService: Title) {
    this.titleService.setTitle("Find a Ride");
  }

  todaysDate(): Date {
    return new Date();
  }

  submit(){
    localStorage.setItem("filterDate", this.departureDate);
    localStorage.setItem("originRadius", this.originRadius.toString());
    localStorage.setItem("destinationRadius", this.destinationRadius.toString());
    location.assign("http://"+location.host+"/rides");
  }

  reset(){
    localStorage.removeItem("filterDate");
    localStorage.removeItem("filterOrigin");
    localStorage.removeItem("filterDestination");
  this.departureDate= null;
  this.rideDestination= null;
  this.rideOrigin= null;
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      departureDate: new FormControl('departureDate')
    });
    this.secondFormGroup = this._formBuilder.group({
      origin: new FormControl('origin'),
      originRadius: new FormControl('originRadius')
    });
    this.thirdFormGroup = this._formBuilder.group({
      destination: new FormControl('destination'),
      destinationRadius: new FormControl('destinationRadius')
    });
    if (localStorage.getItem("filterOrigin")){
      this.rideOrigin = localStorage.getItem("filterOrigin");
    }
    if (localStorage.getItem("filterDestination")){
      this.rideDestination = localStorage.getItem("filterDestination");
    }
    if (localStorage.getItem("filterDate")){
      this.departureDate = localStorage.getItem("filterDate");
    }
    if (localStorage.getItem("originRadius")){
      this.originRadius = parseInt(localStorage.getItem("originRadius"));
    }else {
      this.originRadius = 20;
    }
    if (localStorage.getItem("destinationRadius")){
      this.destinationRadius = parseInt(localStorage.getItem("destinationRadius"));
    }else {
      this.destinationRadius = 20;
    }
  }
}
