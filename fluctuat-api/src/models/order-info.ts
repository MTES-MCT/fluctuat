import { Person } from './person';
import { Ship } from './ship';

export class OrderInfo {
  customer: Person;
  sender: Person;
  receiver: Person;
  transporter: Person;
  ship: Ship
}
