import { Address } from './address';
import { Ship } from './ship';

export class Transporter {

  name: string;
  address: Address = new Address();
  phone: string;
  email: string;
  ship: Ship = new Ship();
}
