import * as nunjucks from 'nunjucks';
import { Waybill } from '../../models/waybill';

export const waybillLoadedEmailBody = (waybill: Waybill, accessLink: string) =>
  nunjucks.render(__dirname + '/waybill-loaded-email-body.html', { waybill, accessLink });
