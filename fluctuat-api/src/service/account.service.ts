import { AppConfig } from '../app.config';
import { EmailData } from '../email/email-data';
import { EmailService } from '../email/email.service';
import { User } from '../models/user';
import { resetPasswordEmailBody } from './reset-password-email-body/reset-password-email-body';
import { welcomeEmailBody } from './welcome-email-body/welcome-email-body';

const emailService = EmailService.getInstance();
const baseUrl = AppConfig.getBaseUrl();

const getChangePasswordLink = (token) =>
  `${baseUrl}/changement-mot-de-passe/?token=${token}`;

const welcomeEmail = (user: User, token: string): EmailData => {
  const changePasswordLink = getChangePasswordLink(token);

  return {
    to: [{ name: user.name, email: user.email }],
    subject: 'Votre compte sur Fluctu@t a été crée',
    body: {
      html: welcomeEmailBody(changePasswordLink)
    }
  };
};

const sendWelcomeEmail = (user: User, token: string) =>
  emailService.sendEmail(welcomeEmail(user, token));

const recoverPasswordEmail = (user: User, token: string): EmailData => {
  const changePasswordLink = getChangePasswordLink(token);

  return {
    to: [{ name: user.name || '', email: user.email }],
    subject: 'Réinitialisation du mot de passe',
    body: {
      html: resetPasswordEmailBody(changePasswordLink)
    }
  };
};

const sendRecoverPasswordEmail = (user: User, token: string) =>
  emailService.sendEmail(recoverPasswordEmail(user, token));

export { sendWelcomeEmail, sendRecoverPasswordEmail };
