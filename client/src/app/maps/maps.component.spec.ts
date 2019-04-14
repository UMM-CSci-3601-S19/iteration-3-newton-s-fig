import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsComponent } from './maps.component';
import {AgmCoreModule} from "@agm/core";

describe('MapsComponent', () => {
  let component: MapsComponent;
  let fixture: ComponentFixture<MapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AgmCoreModule.forRoot() ],
      declarations: [ MapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain an element with id "map"', () => {
    expect(document.getElementById("map")).toBeDefined();
  });

  it('should have a defined height by default', () => {
    expect(document.getElementById("map")
      .style
      .height
      .length)
      .toBeGreaterThan(0);
  });
});
