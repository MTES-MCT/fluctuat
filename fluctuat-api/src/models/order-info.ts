import { Merchandise } from './merchandise';
import { Middleman } from './middleman';
import { Person } from './person';
import { PortInfo } from './port-info';
import { Ship } from './ship';
import { Transporter } from './transporter';

export class OrderInfo {
  customer: Person = new Person();
  sender: Person = new Person();
  receiver: Person = new Person();
  middleman: Middleman = new Middleman();
  transporter: Transporter = new Transporter();
  ship: Ship = new Ship();

  originInfo: PortInfo = new PortInfo();
  destinationInfo: PortInfo = new PortInfo();
  merchandise: Merchandise = new Merchandise();

  sentAt: Date;
}
