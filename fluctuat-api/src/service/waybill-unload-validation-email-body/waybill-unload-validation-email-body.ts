import * as nunjucks from 'nunjucks';

export const waybillUnLoadValidationEmailBody = (name, waybillId, confirmationLink) =>
  nunjucks.render(__dirname + '/waybill-unload-validation-email-body.html', {name, waybillId, confirmationLink});
