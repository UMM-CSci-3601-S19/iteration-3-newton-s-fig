import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Ride} from './ride';
import {RideListComponent} from './ride-list.component';
import {RideListService} from './ride-list.service';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {CustomModule} from '../custom.module';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import {RideComponent} from "./ride.component";
import {ChatService} from "../chat/chat-service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {AgmCoreModule, MapsAPILoader} from "@agm/core";
import {FilterService} from "../filter/filter.service";

describe('Ride list', () => {

  let rideList: RideListComponent;
  let fixture: ComponentFixture<RideListComponent>;

  let filterServiceStub: {
    getRides: () => Observable<Ride[]>,
    addListener: (RideListComponent) => void
  };

  beforeEach(() => {
    // stub RideService for test purposes
    filterServiceStub = {
      getRides: () => Observable.of([
        {
          _id: {
            $oid: 'chris_id'
          },
          driver: 'Chris',
          notes: 'These are Chris\'s ride notes',
          seatsAvailable: 3,
          origin: 'UMM',
          destination: 'Willie\'s',
          departureDate: 'April 4th, 2019',
          departureTime: '4:00 AM',
          dateObject: "2019-04-04T04:00:00.000Z"
        },
        {
          _id: {
            $oid: 'dennis_id'
          },
          driver: 'Dennis',
          notes: 'These are Dennis\'s ride notes',
          seatsAvailable: 3,
          origin: 'Caribou Coffee',
          destination: 'Minneapolis, MN',
          departureDate: 'August 15th, 2019',
          departureTime: '11:30 PM',
          dateObject: "2019-08-15T23:30:00.000Z"
        },
        {
          _id: {
            $oid: 'agatha_id'
          },
          driver: 'Agatha',
          notes: 'These are Agatha\'s ride notes',
          seatsAvailable: 6,
          origin: 'UMM',
          destination: 'Fergus Falls, MN',
          departureDate: 'March 30th, 2018',
          departureTime: '16:30 PM',
          dateObject: "2018-03-30T16:30:00.000Z"
        }
      ]),
      addListener: RideListComponent => {}
    };

    TestBed.configureTestingModule({
      imports: [CustomModule, HttpClientTestingModule, AgmCoreModule.forRoot()],
      declarations: [RideListComponent, RideComponent],
      providers: [
        {provide: FilterService, useValue: filterServiceStub},
        ChatService
      ]
    });
  });

  beforeEach(async(() => {
    const testUser = {
      _id: "",
      name: "Test User",
      phone: "000-000-0000",
      email: "test@example.com",
    };
    localStorage.setItem("user", JSON.stringify(testUser));

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(RideListComponent);
      rideList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));
});

describe('Misbehaving Ride List', () => {
  let rideList: RideListComponent;
  let fixture: ComponentFixture<RideListComponent>;

  let filterServiceStub: {
    getRides: () => Observable<Ride[]>,
    addListener: (RideListComponent) => void
  };

  beforeEach(() => {
    // stub RideService for test purposes
    filterServiceStub = {
      getRides: () => Observable.create(observer => {
        observer.error('Error-prone observable');
      }),
      addListener: RideListComponent => {}
    };

    TestBed.configureTestingModule({
      imports: [FormsModule, CustomModule, HttpClientTestingModule, AgmCoreModule.forRoot()],
      declarations: [RideListComponent, RideComponent],
      providers: [
        {provide: FilterService, useValue: filterServiceStub},
        ChatService
      ]
    });
  });

  beforeEach(async(() => {
    const testUser = {
      _id: "",
      name: "Test User",
      phone: "000-000-0000",
      email: "test@example.com",
    };
    localStorage.setItem("user", JSON.stringify(testUser));

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(RideListComponent);
      rideList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a RideListService', () => {
    // Since the observer throws an error, we don't expect rides to be defined.
    expect(rideList.rides).toBeUndefined();
  });
});
