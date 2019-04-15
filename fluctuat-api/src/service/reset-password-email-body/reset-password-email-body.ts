import * as nunjucks from 'nunjucks';

export const resetPasswordEmailBody = (changePasswordLink) =>
  nunjucks.render(__dirname + '/reset-password-email-body.html', { changePasswordLink });
