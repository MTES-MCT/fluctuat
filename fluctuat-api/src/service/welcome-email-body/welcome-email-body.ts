import * as nunjucks from 'nunjucks';

export const welcomeEmailBody = (changePasswordLink) =>
  nunjucks.render(__dirname + '/welcome-email-body.html', { changePasswordLink });
