import * as mailjet from 'node-mailjet';
import { AppConfig } from '../app.config';
import { convert } from './sms.utils';

class SmsService {

  private mailjetService;

  constructor(apiToken: string, private debug = false) {
    console.log('init sms service debug:', debug);

    this.mailjetService = mailjet.connect(apiToken, {
      url: 'api.mailjet.com',
      version: 'v4',
      perform_api_call: !debug
    });
  }

  sendSms(cellphone: string, text: string) {
    if (!cellphone) {
      console.log('No cellphone to send sms');
      return;
    }

    const smsData = {
      From: 'Fluctuat',
      To: convert(cellphone),
      Text: text
    };

    if (this.debug) {
      console.log('sms sent', smsData);
    }

    return this.mailjetService.post('sms-send')
      .request(smsData);
  }

}

export const smsService = new SmsService(AppConfig.SMS_API_TOKEN, AppConfig.DEBUG);
