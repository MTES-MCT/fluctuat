import { Company } from '../shared/company';
import { Merchandise } from '../shared/merchandise';

export class Delivery {

  client: Company = new Company();
  sender: string;
  receiver: string;

  origin: string;
  departureDate: Date;
  departureTime: Date;

  destination: string;
  arrivalDate: Date;
  arrivalTime: Date;

  // Merchandise
  merchandise: Merchandise = new Merchandise();

  loadDelay: string;
  unloadDelay: string;

  //prices
  price: string;
  clientPayTaxes: boolean = false;
  delayPenalty: string

}
