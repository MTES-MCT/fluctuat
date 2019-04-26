import { Merchandise } from './merchandise';
import { Middleman } from './middleman';
import { Person } from './person';
import { PortInfo } from './port-info';
import { Ship } from './ship';
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
  merchandise: Merchandise;

  sentAt: Date;
}
