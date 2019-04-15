import * as nunjucks from 'nunjucks';

export const waybillAccessEmailBody = (waybillId: string, accessLink: string) =>
  nunjucks.render(__dirname + '/waybill-access-email-body.html', { waybillId, accessLink });
