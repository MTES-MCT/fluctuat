import { EmailData } from './email-data';
import * as mailjet from 'node-mailjet';

const DEFAULT_FROM = {
  email: 'elias.boukamza@beta.gouv.fr',
  name: 'Fluctuat Info'
};

export class EmailService {

  mailjetService;

  constructor(user: string, password: string, debug = false) {
    console.log('init email service');
    this.mailjetService = mailjet.connect(user, password, { version: 'v3.1', perform_api_call: !debug })
  }

  sendEmail(data: EmailData, pdf?: { name: string, content: string }) {

    const request: any = {
      Messages: [
        {
          From: {
            Email: DEFAULT_FROM.email,
            Name: DEFAULT_FROM.name
          },
          To: data.to.map(item => ({ Email: item.email, Name: item.name })),
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
}
