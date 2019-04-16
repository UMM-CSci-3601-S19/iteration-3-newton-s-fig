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
  public departureDate: string;

  constructor(private _formBuilder: FormBuilder) { }

  todaysDate(): Date {
    return new Date();
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      departureDate: new FormControl('departureDate')
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
