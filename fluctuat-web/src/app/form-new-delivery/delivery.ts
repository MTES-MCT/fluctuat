import { Company } from '../shared/company';

export class Delivery {

  client: Company = new Company();

  origin: string;
  departureTime: Date;
  destination: string;
  arrivalTime: Date;

  // Merchandise
  type: string;
  weight: string;
  loadDelay: string;
  unloadDelay: string;
  dangerous: boolean = false;

  //prices
  price: string;
  clientPayTaxes: boolean = false;
  delayPenalty: string

}
