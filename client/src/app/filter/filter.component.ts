import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'filter-component',
  templateUrl: 'filter.component.html'
})

export class FilterComponent {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  todaysDate(): Date {
    return new Date();
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      dateCtrl: ['date']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
