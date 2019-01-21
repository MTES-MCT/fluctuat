import { Person } from './person';
import { Ship } from './ship';

export class WayBill {
  customer: Person;
  sender: Person;
  receiver: Person;
  transporter: Person;
  ship: Ship
}
