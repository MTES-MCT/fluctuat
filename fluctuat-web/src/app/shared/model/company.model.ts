import { Address } from './address.model';

export class Company {

  name: string;
  address: Address = new Address();
  phone: string;
  email: string;

}
