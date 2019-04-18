import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'filter-component',
  templateUrl: 'filter.component.html'
})

export class FilterComponent {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  public departureDate: string;
  public rideDestination: string;
  public rideOrigin: string;


  constructor(private _formBuilder: FormBuilder) { }

  todaysDate(): Date {
    return new Date();
  }

  submit(){

  }
  reset(){
  this.departureDate='';
  this.rideDestination='';
  this.rideOrigin='';
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      departureDate: new FormControl('departureDate')
    });
    this.secondFormGroup = this._formBuilder.group({
      origin: new FormControl('origin')
    });
    this.thirdFormGroup = this._formBuilder.group({
      destination: new FormControl('destination')
    });
  }
}
