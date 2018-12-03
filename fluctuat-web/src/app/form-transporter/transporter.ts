import { Company } from '../shared/company';
import { Ship } from './ship';

export class Transporter extends Company {

  ship: Ship = new Ship();
}
