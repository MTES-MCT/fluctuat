import { EmailData } from '../email/email-data';
import { EmailService } from '../email/email.service';
import { Waybill } from '../models/waybill';
import { WaybillNotify } from '../models/waybill.notify';
import { generateWaybillPdf } from '../pdf/generate-waybill-pdf';
import { SmsService } from '../sms/sms.service';
import { getBaseUrl } from './config.service';
import { waybillAccessEmailBody } from './waybill-access-email-body/waybill-access-email-body';
import { waybillLoadValidationEmailBody } from './waybill-load-validation-email-body/waybill-load-validation-email-body';
import { waybillLoadedEmailBody } from './waybill-loaded-email-body/waybill-loaded-email-body';
import { waybillNotificationEmailBody } from './waybill-notification-email-body/waybill-notification-email-body';
import { waybillUnLoadValidationEmailBody } from './waybill-unload-validation-email-body/waybill-unload-validation-email-body';

const emailService = EmailService.getInstance();
const smsService = SmsService.getInstance();
const baseUrl = getBaseUrl();

const sendWaybill = (waybill: Waybill) => {
  const accessLink = getWaybillAccessLink(waybill.code);

  const email: EmailData = {
    to: [
      waybill.order.customer,
      waybill.order.receiver,
      waybill.order.transporter,
      waybill.order.sender,
      waybill.order.middleman,
      { name: '', email: waybill.order.destinationInfo.email },
      { name: '', email: waybill.owner },
    ],
    subject: `⚓ Lettre de voiture ${waybill.code} - déchargement confirmé`,
    body: {
      text: '',
      html: waybillAccessEmailBody(waybill.code, accessLink)
    }
  };

  return generateWaybillPdf(waybill)
    .then((buffer: any) => {
      return {
        name: `lettre-de-voiture-${waybill.code}.pdf`,
        content: Buffer.from(buffer).toString('base64')
      };
    })
    .then(pdf => emailService.sendEmail(email, pdf));
};

const sendWaybillLoaded = (waybill: Waybill) => {
  const accessLink = getWaybillAccessLink(waybill.code);

  const email: EmailData = {
    to: [
      waybill.order.customer,
      waybill.order.receiver,
      waybill.order.transporter,
      waybill.order.sender,
      waybill.order.middleman,
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

  return generateWaybillPdf(waybill)
    .then((buffer: any) => {
      return {
        name: `lettre-de-voiture-${waybill.code}-chargement.pdf`,
        content: Buffer.from(buffer).toString('base64')
      };
    })
    .then(pdf => emailService.sendEmail(email, pdf));
};

const sendWaybillLoadValidation = (waybill: Waybill, confirmationLink: string) => {
  const transporter = waybill.order.transporter;

  const email: EmailData = {
    to: [transporter],
    subject: `⚓ Chargement à confirmer - Lettre de voiture nº ${waybill.code}`,
    body: {
      html: waybillLoadValidationEmailBody(transporter.name, waybill.code, confirmationLink)
    }
  };

  const sms = `Veuillez confirmer le chargement. ${confirmationLink}`;

  return Promise.all([
    emailService.sendEmail(email),
    smsService.sendSms(transporter.cellphone, sms)
  ]);
};

const sendWaybillUnloadValidation = (waybill: Waybill, confirmationLink: string) => {
  const transporter = waybill.order.transporter;

  const email: EmailData = {
    to: [transporter],
    subject: `⚓ Déchargement à confirmer - Lettre de voiture nº ${waybill.code}`,
    body: {
      html: waybillUnLoadValidationEmailBody(transporter.name, waybill.code, confirmationLink)
    }
  };

  const sms = `Veuillez confirmer le déchargement. ${confirmationLink}`;

  return Promise.all([
    emailService.sendEmail(email),
    smsService.sendSms(transporter.cellphone, sms)
  ]);
};

const sendWaybillNotification = (notifyData: WaybillNotify, waybill: Waybill) => {
  const accessLink = getWaybillAccessLink(waybill.code);

  const sendActions = [];

  if (notifyData.email) {
    const email: EmailData = {
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
    sendActions.push(smsService.sendSms(notifyData.cellphone, sms));
  }

  return Promise.all(sendActions);
};

const getWaybillAccessLink = (waybillId) => `${baseUrl}/acces-lettre-de-voiture?id=${waybillId}`;

export {
  sendWaybill,
  sendWaybillLoaded,
  sendWaybillLoadValidation,
  sendWaybillUnloadValidation,
  sendWaybillNotification
};
