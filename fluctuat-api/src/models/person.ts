import { HasEmail } from './has-email.interface';

export class Person implements HasEmail {
  name: string;
  email: string;
  cellphone: string;
}
