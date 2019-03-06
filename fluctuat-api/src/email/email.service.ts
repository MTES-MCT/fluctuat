import { EmailData } from './email-data';
import * as mailjet from 'node-mailjet';
import { HasEmail } from '../models/has-email.interface';

const DEFAULT_FROM = {
  email: 'elias.boukamza@beta.gouv.fr',
  name: 'Fluctuat Info'
};

export class EmailService {

  mailjetService;

  constructor(user: string, password: string, debug = false) {
    console.log('init email service. debug', debug);
    this.mailjetService = mailjet.connect(user, password, { version: 'v3.1', perform_api_call: !debug })
  }

  sendEmail(data: EmailData, pdf?: { name: string, content: string }) {

    const request: any = {
      Messages: [
        {
          From: { Email: DEFAULT_FROM.email, Name: DEFAULT_FROM.name },
          To: EmailService.getValidReceivers(data.to),
          Subject: data.subject,
          TextPart: data.body.text,
          HTMLPart: data.body.html
        }
      ]
    };

    if (pdf) {
      request.Messages[0].Attachments = [{
        ContentType: 'application/pdf',
        Filename: pdf.name,
        Base64Content: pdf.content,
      }]
    }

    return this.mailjetService.post('send')
      .request(request);
  }

  static getValidReceivers(emails) {
    return emails
    // filter empty emails
      .filter(item => !!item.email)
      // map to mailjet model
      .map(item => ({ Email: item.email, Name: item.name || '' }));
  }
}
