import { Person } from './person';
import { Ship } from './ship';
import { LoadInfo } from './load-info';

export class Waybill {
  id: string;
  customer: Person;
  sender: Person;
  receiver: Person;
  transporter: Person;
  ship: Ship;
  loadInfo: LoadInfo;
}
