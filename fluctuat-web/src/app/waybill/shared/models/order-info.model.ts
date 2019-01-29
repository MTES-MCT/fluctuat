import { Person } from './person.model';
import { Ship } from './ship.model';

export class OrderInfo {
  customer: Person = new Person();
  sender: Person = new Person();
  receiver: Person = new Person();
  transporter: Person = new Person();
  ship: Ship = new Ship()
}
