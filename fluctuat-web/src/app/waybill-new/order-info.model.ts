import { Person } from './person.model';
import { Ship } from './ship.model';

export class OrderInfo {
  customer: Person;
  sender: Person;
  receiver: Person;
  transporter: Person;
  ship: Ship
}
