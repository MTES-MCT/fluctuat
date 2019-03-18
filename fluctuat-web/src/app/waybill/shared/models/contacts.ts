import { Ship } from './ship.model';
import { Transporter } from './transporter.model';
import { Middleman } from './middleman.model';
import { Person } from './person.model';

export class Contacts {
  customerNames;
  customerEmails;
  senderNames;
  senderEmails;
  receiverNames;
  receiverEmails;
  middlemanNames;
  middlemanEmails;
  transporterNames;
  transporterEmails;
  transporterCellphones;
  shipNames;
  shipRegNumbers;
  loadManagerEmails;
  unloadManagerEmails;
  customers: Person[];
  senders: Person[];
  receivers: Person[];
  middlemen: Middleman[];
  transporters: Transporter[];
  ships: Ship[];
}
