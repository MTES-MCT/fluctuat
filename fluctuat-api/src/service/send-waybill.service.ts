import { getDocDefinition } from '../pdf/waybill-pdf';
import { generatePdf } from '../pdf/generate-pdf';
import { EmailService } from '../email/email.service';
import { Waybill } from '../models/waybill';
import { EmailData } from '../email/email-data';
import { SmsService } from '../sms/sms.service';
import { WaybillNotify } from '../models/waybill.notify';

let account = JSON.parse(require('fs').readFileSync('.data/email.config.json'));
let emailService = new EmailService(account.user, account.pass);

let smsConfig = JSON.parse(require('fs').readFileSync('.data/sms.config.json'));
const smsService = new SmsService(smsConfig.token, true);

const sendWaybill = (waybill: Waybill) => {
  let email: EmailData = {
    to: [
      waybill.order.customer,
      waybill.order.receiver,
      waybill.order.transporter,
      waybill.order.sender
    ],
    subject: `⛴️ Lettre de voiture ${waybill.id}`,
    body: {
      text: 'Veuillez trouver ci-joint votre lettre de voiture.',
      html: '<h3>Veuillez trouver ci-joint votre lettre de voiture</h3><br><p>Fluctuat</p>'
    }
  };

  return generatePdf(getDocDefinition(waybill))
    .then((buffer: any) => {
      return {
        name: `${waybill.id}.pdf`,
        content: Buffer.from(buffer).toString('base64')
      };
    })
    .then(pdf => emailService.sendEmail(email, pdf))
};

const sendWaybillLoaded = (waybill: Waybill, baseUrl: string) => {

  let email: EmailData = {
    to: [
      waybill.order.customer,
      waybill.order.receiver,
      waybill.order.sender
    ],
    subject: `⚓  Chargement confirmé -️ Lettre de voiture nº ${waybill.id}`,
    body: {
      text: '',
      html: `<p>Bonjour,</p>
             <p>Le chargement a été confirmé par le transporteur.</p>
             <p>Vous pouvez consulter les informations en cliquant sur
             <a href="${baseUrl}/acces-lettre-de-voiture?id=${waybill.id}">ce lien</a></p>
             <p>Fluctuat</p>`
    }
  };

  return emailService.sendEmail(email);
};

const sendWaybillLoadValidation = (waybill: Waybill, baseUrl: string) => {
  let transporter = waybill.order.transporter;
  let confirmationLink = `${baseUrl}/lettre-de-voiture/${waybill.id}/confirmation-chargement`;

  let email: EmailData = {
    to: [transporter],
    subject: `⚓ Chargement à confirmer - Lettre de voiture nº ${waybill.id}`,
    body: {
      html: `<p>Bonjour ${transporter.name},</p>
             <p>Les informations sur le chargement de la lettre de voiture nº ${waybill.id} ont été enregistreés,
              veuillez les confirmer dès maintenant.</p>
             <a href="${confirmationLink}">Cliquez sur ce lien pour accéder à votre lettre de voiture</a>
             <p>Fluctuat</p>`
    }
  };

  let sms = `Veuillez confirmer le chargement. ${confirmationLink}`;

  return Promise.all([
    emailService.sendEmail(email),
    smsService.sendSms(transporter.cellPhone, sms)
  ]);
};

const sendWaybillUnloadValidation = (waybill: Waybill, baseUrl: string) => {
  let transporter = waybill.order.transporter;
  let confirmationLink = `${baseUrl}/lettre-de-voiture/${waybill.id}/confirmation-dechargement`;

  let email: EmailData = {
    to: [transporter],
    subject: `⚓ Déchargement à confirmer - Lettre de voiture nº ${waybill.id}`,
    body: {
      html: `<p>Bonjour ${transporter.name},</p>
             <p>Les informations sur le déchargement de la lettre de voiture nº ${waybill.id} ont été enregistreés,
              veuillez les confirmer dès maintenant.</p>
             <a href="${confirmationLink}">Cliquer sur ce lien pour accéder à votre lettre de voiture</a>
             <p>Fluctuat</p>`
    }
  };

  let sms = `Veuillez confirmer le déchargement. ${confirmationLink}`;

  return Promise.all([
    emailService.sendEmail(email),
    smsService.sendSms(transporter.cellPhone, sms)
  ]);
};

const sendWaybillNotification = (notifyData: WaybillNotify, baseUrl: string) => {
  const sms = `La Lettre de voiture ${notifyData.waybillId} est disponible sur fluctuat.` +
    ` ${baseUrl}/acces-lettre-de-voiture?id=${notifyData.waybillId}`;

  return smsService.sendSms(notifyData.cellphone, sms)
};

export {
  sendWaybill,
  sendWaybillLoaded,
  sendWaybillLoadValidation,
  sendWaybillUnloadValidation,
  sendWaybillNotification
}

