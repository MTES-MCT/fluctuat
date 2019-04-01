import { HasEmail } from '../models/has-email.interface';

export interface EmailData {
  to: HasEmail[];
  subject: string;
  body: {
    text?: string,
    html?: string
  };
}
