import { Person } from './person.model';
import { Ship } from './ship.model';
import { Middleman } from './middleman.model';

export class OrderInfo {
  customer: Person = new Person();
  sender: Person = new Person();
  receiver: Person = new Person();
  middleman: Middleman = new Middleman();
  transporter: Person = new Person();
  ship: Ship = new Ship()
}
