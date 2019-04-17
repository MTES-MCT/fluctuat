import * as mailjet from 'node-mailjet';
import { getConfig } from '../service/config.service';
import { convert } from './sms.utils';

const config = getConfig();
const smsConfig = config.sms;

export class SmsService {
  static smsService = new SmsService(smsConfig.token, config.debug);

  mailjetService;

  constructor(apiToken: string, debug = false) {
    console.log('init sms service debug:', debug);

    this.mailjetService = mailjet.connect(apiToken, {
      url: 'api.mailjet.com',
      version: 'v4',
      perform_api_call: !debug
    });
  }

  static getInstance(): SmsService {
    return this.smsService;
  }

  sendSms(cellphone: string, text: string) {
    if (!cellphone) {
      console.log('No cellphone to send sms');
      return;
    }

    const smsData = {
      Text: text,
      To: convert(cellphone),
      From: 'Fluctuat'
    };

    console.log('sending sms', smsData);
    return this.mailjetService.post('sms-send')
      .request(smsData);
  }

}
