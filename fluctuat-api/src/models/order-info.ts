import { Person } from './person';
import { Ship } from './ship';
import { Middleman } from './middleman';
import { PortInfo } from './port-info';
import { Merchandise } from './merchandise';

export class OrderInfo {
  customer: Person;
  sender: Person;
  receiver: Person;
  middleman: Middleman;
  transporter: Person;
  ship: Ship;
  originInfo: PortInfo;
  destinationInfo: PortInfo;
  merchandise: Merchandise
}
