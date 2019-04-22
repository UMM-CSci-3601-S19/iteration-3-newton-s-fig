export interface Ride {
  _id: {
    $oid: string;
  };
  driver: string;
  notes: string;
  seatsAvailable: number;
  origin: Object;
  destination: Object;
  departureDate: string;
  departureTime: string;
  dateObject: string;
}
