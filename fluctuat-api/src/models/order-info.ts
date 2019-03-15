import { Person } from './person';
import { Ship } from './ship';
import { Middleman } from './middleman';
import { PortInfo } from './port-info';
import { Merchandise } from './merchandise';
import { Transporter } from './transporter';

export class OrderInfo {
  customer: Person;
  sender: Person;
  receiver: Person;
  middleman: Middleman;
  transporter: Transporter;
  ship: Ship;
  originInfo: PortInfo;
  destinationInfo: PortInfo;
  merchandise: Merchandise
}
