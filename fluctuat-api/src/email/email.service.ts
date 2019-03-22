import { EmailData } from './email-data';
import * as mailjet from 'node-mailjet';
import { HasEmail } from '../models/has-email.interface';

const config = require('../../.data/config.json');
const emailConfig = config.email;

export class EmailService {

  mailjetService;

  static emailService = new EmailService(emailConfig.user, emailConfig.pass, emailConfig.sender, config.debug);

  private constructor(user: string, password: string, private sender: HasEmail, debug = false) {
    console.log(`Init email service: send from ${sender.email} with debug: ${debug}`);
    this.mailjetService = mailjet.connect(user, password, { version: 'v3.1', perform_api_call: !debug })
  }

  static getInstance(): EmailService {
    return this.emailService;
  }

  sendEmail(data: EmailData, pdf?: { name: string, content: string }) {

    const request: any = {
      Messages: [
        {
          From: { Name: this.sender.name, Email: this.sender.email },
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
