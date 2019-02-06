import * as mailjet from 'node-mailjet';

export class SmsService {
  mailjetService;

  constructor(apiToken: string, debug = false) {
    console.log('init sms service debug:', debug);

    this.mailjetService = mailjet.connect(apiToken, {
      url: 'api.mailjet.com',
      version: 'v4',
      perform_api_call: !debug
    })
  }

  sendSms(cellphone: string, text: string) {
    if (!cellphone) {
      console.log('No cellphone to send sms');
      return;
    }

    const smsData = {
      Text: text,
      To: this.convert(cellphone),
      From: 'Fluctuat'
    };

    console.log('sending sms', smsData);
    return this.mailjetService.post('sms-send')
      .request(smsData)
  }

  convert(cellphone) {
    return '+33'.concat( //add french prefix
      cellphone.replace(/\s/g, '') // remove spaces
        .substring(1)// remove first 0
    )
  }

}
