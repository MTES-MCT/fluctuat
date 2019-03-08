import { EmailData } from './email-data';
import * as mailjet from 'node-mailjet';
import { HasEmail } from '../models/has-email.interface';

export class EmailService {

  mailjetService;

  constructor(user: string, password: string, debug = false, private sender: HasEmail) {
    console.log(`Init email service: send from ${sender.email} with debug: ${debug}`);
    this.mailjetService = mailjet.connect(user, password, { version: 'v3.1', perform_api_call: !debug })
  }

  sendEmail(data: EmailData, pdf?: { name: string, content: string }) {

    const request: any = {
      Messages: [
        {
          From: { Name: this.sender.name, Email: this.sender.email},
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
