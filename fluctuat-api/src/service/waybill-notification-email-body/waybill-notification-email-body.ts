import * as nunjucks from 'nunjucks';

import { Waybill } from '../../models/waybill';

export const waybillNotificationEmailBody = (waybill: Waybill, accessLink: string) =>
  nunjucks.render(__dirname + '/waybill-notification-email-body.html', {waybill, accessLink});
