import * as mailjet from 'node-mailjet';
import { AppConfig } from '../app.config';
import { EmailData } from './email-data';
import { getValidReceivers } from './email.utils';

export class EmailService {

  static emailService = new EmailService(AppConfig.EMAIL_API_KEY, AppConfig.EMAIL_API_PASSWORD,
    AppConfig.EMAIL_USER, AppConfig.EMAIL_NAME, AppConfig.DEBUG);

  mailjetService;

  private constructor(apiKey: string, apiPassword: string, private senderEmail: string, private senderName: string, private debug = false) {
    console.log(`Init email service: send from ${senderEmail} with debug: ${debug}`);
    this.mailjetService = mailjet.connect(apiKey, apiPassword, { version: 'v3.1', perform_api_call: !debug });
  }

  static getInstance(): EmailService {
    return this.emailService;
  }

  sendEmail(data: EmailData, pdf?: { name: string, content: string }) {

    const request: any = {
      Messages: [
        {
          From: { Name: this.senderName, Email: this.senderEmail },
          To: getValidReceivers(data.to),
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
      }];
    }

    if (this.debug) {
      console.log('email request sent:', JSON.stringify(request, null, 2));
    }

    return this.mailjetService.post('send')
      .request(request);
  }
}
