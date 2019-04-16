import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Ride} from './ride';
import {RideListService} from './ride-list.service';

describe('Ride list service: ', () => {
  // A small collection of test rides
  const testRides: Ride[] = [
    {
      _id: { $oid: 'chris_id' },
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
      _id: { $oid: 'dennis_id' },
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
      _id: { $oid: 'agatha_id' },
      driver: 'Agatha',
      notes: 'These are Agatha\'s ride notes',
      seatsAvailable: 6,
      origin: 'UMM',
      destination: 'Fergus Falls, MN',
      departureDate: 'March 30th, 2018',
      departureTime: '16:30',
      dateObject: "2018-03-30T16:30:00.000Z"
    }
  ];

  let rideListService: RideListService;

  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    rideListService = new RideListService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('getRides() calls api/rides and returns appropriate objects', () => {
    // Assert that the rides we get from this call to getRides()
    // should be our set of test rides. Because we're subscribing
    // to the result of getRides(), this won't actually get
    // checked until the mocked HTTP request "returns" a response.
    // This happens when we call req.flush(testRides) a few lines
    // down.
    rideListService.getRides().subscribe(
      rides => expect(rides).toEqual(testRides)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(rideListService.baseUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testRides);
  });

  it('successfully adds a ride while leaving optional fields empty', () => {
    const ride_id = 'ride_id';
    const newRide: Ride = {
      _id: { $oid: 'ride_id' },
      driver: 'Jesse',
      seatsAvailable: 72,
      origin: 'UMM',
      destination: 'Alexandria',
      departureDate: '',
      departureTime: '',
      notes: '',
      dateObject:''
    };

    rideListService.addNewRide(newRide).subscribe(
      id => {
        expect(JSON.parse(id).$oid).toBe(ride_id);
      },
      err => {
        expect(err).toBeNull();
      }
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(rideListService.baseUrl + '/new');
    // Check that the request made to that URL was a POST request.
    expect(req.request.method).toEqual('POST');
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(newRide._id);
  });
});
