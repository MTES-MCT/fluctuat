import { EmailService } from '../email/email.service';
import { Waybill } from '../models/waybill';
import { EmailData } from '../email/email-data';
import { SmsService } from '../sms/sms.service';
import { WaybillNotify } from '../models/waybill.notify';
import { generateWaybillPdf } from '../pdf/generate-waybill-pdf';
import { waybillLoadedEmailBody } from './waybill-loaded-email-body';
import { waybillNotificationEmailBody } from './waybill-notification-email-body';

const config = require('../../.data/config.json');
const emailConfig = config.email;
const emailService = new EmailService(emailConfig.user, emailConfig.pass, config.debug, emailConfig.sender);

const smsConfig = config.sms;
const smsService = new SmsService(smsConfig.token, config.debug);

const sendWaybill = (waybill: Waybill, baseUrl: string) => {
  const accessLink = getWaybillAccessLink(baseUrl, waybill.code);

  let email: EmailData = {
    to: [
      waybill.order.customer,
      waybill.order.receiver,
      waybill.order.transporter,
      waybill.order.sender,
      { name: '', email: waybill.order.destinationInfo.email },
      { name: '', email: waybill.owner },
    ],
    subject: `⛴️ Lettre de voiture ${waybill.code} - déchargement confirmé`,
    body: {
      text: '',
      html: `<p>Bonjour,</p>
             <p>La lettre de voiture nº ${waybill.code} a été confirmé par le transporteur.</p>
             <p>Vous pouvez consulter les informations en cliquant sur
             <a href="${accessLink}">ce lien</a></p>
             <h3>Veuillez trouver ci-joint votre lettre de voiture</h3>
             <br>
             <p>Cordialement,</p>
             <p>L'équipe de Fluctu@t</p>`
    }
  };

  return generateWaybillPdf(waybill, baseUrl)
    .then((buffer: any) => {
      return {
        name: `lettre-de-voiture-${waybill.code}.pdf`,
        content: Buffer.from(buffer).toString('base64')
      };
    })
    .then(pdf => emailService.sendEmail(email, pdf))
};

const sendWaybillLoaded = (waybill: Waybill, baseUrl: string) => {
  const accessLink = getWaybillAccessLink(baseUrl, waybill.code);

  let email: EmailData = {
    to: [
      waybill.order.customer,
      waybill.order.receiver,
      waybill.order.transporter,
      waybill.order.sender,
      { name: '', email: waybill.order.originInfo.email },
      { name: '', email: waybill.order.destinationInfo.email },
      { name: '', email: waybill.owner },
    ],
    subject: `⚓  Lettre de voiture nº ${waybill.code} - chargement confirmé️ `,
    body: {
      text: '',
      html: waybillLoadedEmailBody(waybill, accessLink)
    }
  };

  return generateWaybillPdf(waybill, baseUrl)
    .then((buffer: any) => {
      return {
        name: `lettre-de-voiture-${waybill.code}-chargement.pdf`,
        content: Buffer.from(buffer).toString('base64')
      };
    })
    .then(pdf => emailService.sendEmail(email, pdf));
};

const sendWaybillLoadValidation = (waybill: Waybill, baseUrl: string) => {
  let transporter = waybill.order.transporter;
  let confirmationLink = `${baseUrl}/lettre-de-voiture/${waybill.code}/confirmation-chargement`;

  let email: EmailData = {
    to: [transporter],
    subject: `⚓ Chargement à confirmer - Lettre de voiture nº ${waybill.code}`,
    body: {
      html: `<p>Bonjour ${transporter.name},</p>
             <p>Les informations sur le chargement de la lettre de voiture nº ${waybill.code} ont été enregistreés,
              veuillez les confirmer dès maintenant.</p>
             <a href="${confirmationLink}">Cliquez sur ce lien pour accéder à votre lettre de voiture</a>
             <br>
             <p>Cordialement,</p>
             <p>L'équipe de Fluctu@t</p>`
    }
  };

  let sms = `Veuillez confirmer le chargement. ${confirmationLink}`;

  return Promise.all([
    emailService.sendEmail(email),
    smsService.sendSms(transporter.cellphone, sms)
  ]);
};

const sendWaybillUnloadValidation = (waybill: Waybill, baseUrl: string) => {
  let transporter = waybill.order.transporter;
  let confirmationLink = `${baseUrl}/lettre-de-voiture/${waybill.code}/confirmation-dechargement`;

  let email: EmailData = {
    to: [transporter],
    subject: `⚓ Déchargement à confirmer - Lettre de voiture nº ${waybill.code}`,
    body: {
      html: `<p>Bonjour ${transporter.name},</p>
             <p>Les informations sur le déchargement de la lettre de voiture nº ${waybill.code} ont été enregistreés,
              veuillez les confirmer dès maintenant.</p>
             <a href="${confirmationLink}">Cliquer sur ce lien pour accéder à votre lettre de voiture</a>
             <br>
             <p>Cordialement,</p>
             <p>L'équipe de Fluctu@t</p>`
    }
  };

  let sms = `Veuillez confirmer le déchargement. ${confirmationLink}`;

  return Promise.all([
    emailService.sendEmail(email),
    smsService.sendSms(transporter.cellphone, sms)
  ]);
};

const sendWaybillNotification = (notifyData: WaybillNotify, waybill: Waybill, baseUrl: string) => {
  const accessLink = getWaybillAccessLink(baseUrl, waybill.code);

  let sendActions = [];

  if (notifyData.email) {
    let email: EmailData = {
      to: [{ name: '', email: notifyData.email }],
      subject: `⛴️ Lien d'accès à la lettre de voiture ${notifyData.waybillId}`,
      body: {
        html: waybillNotificationEmailBody(waybill, accessLink)
      }
    };
    sendActions.push(emailService.sendEmail(email));
  }

  if (notifyData.cellphone) {
    const sms = `La Lettre de voiture ${notifyData.waybillId} est disponible sur fluctuat. ${accessLink}`;
    sendActions.push(smsService.sendSms(notifyData.cellphone, sms))
  }

  return Promise.all(sendActions);
};

const getWaybillAccessLink = (baseUrl, waybillId) => `${baseUrl}/acces-lettre-de-voiture?id=${waybillId}`;

export {
  sendWaybill,
  sendWaybillLoaded,
  sendWaybillLoadValidation,
  sendWaybillUnloadValidation,
  sendWaybillNotification
}
