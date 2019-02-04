import * as mailjet from 'node-mailjet';

export class SmsService {
  mailjetService;

  constructor(apiToken: string) {
    console.log('init sms service');

    this.mailjetService = mailjet.connect(apiToken, {
      url: 'api.mailjet.com',
      version: 'v4'
    })
  }

  sendSms(cellPhone: string, text: string) {
    const smsData = {
      Text: text,
      To: cellPhone,
      From: 'Fluctuat'
    };

    return this.mailjetService.post('sms-send')
      .request(smsData)
  }

}
