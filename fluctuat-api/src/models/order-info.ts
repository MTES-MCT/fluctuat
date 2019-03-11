import { Person } from './person';
import { Ship } from './ship';
import { Middleman } from './middleman';

export class OrderInfo {
  customer: Person;
  sender: Person;
  receiver: Person;
  middleman: Middleman;
  transporter: Person;
  ship: Ship
}
