import * as nunjucks from 'nunjucks';

export const waybillLoadValidationEmailBody = (name, waybillId, confirmationLink) =>
  nunjucks.render(__dirname + '/waybill-load-validation-email-body.html', {name, waybillId, confirmationLink});
