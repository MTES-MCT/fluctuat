import { EmailService } from '../email/email.service';
import { Waybill } from '../models/waybill';
import { EmailData } from '../email/email-data';
import { SmsService } from '../sms/sms.service';
import { WaybillNotify } from '../models/waybill.notify';
import { generateWaybillPdf } from '../pdf/generate-waybill-pdf';

const config = require('../../.data/config.json');
const emailConfig = config.email;
const emailService = new EmailService(emailConfig.user, emailConfig.pass, config.debug);

const smsConfig = config.sms;
const smsService = new SmsService(smsConfig.token, config.debug);

const sendWaybill = (waybill: Waybill, baseUrl: string) => {
  let email: EmailData = {
    to: [
      waybill.order.customer,
      waybill.order.receiver,
      waybill.order.transporter,
      waybill.order.sender,
      { name: '', email: waybill.owner },
    ],
    subject: `⛴️ Lettre de voiture ${waybill.code}`,
    body: {
      text: '',
      html: `<p>Bonjour,</p>
             <p>Le déchargement a été confirmé par le transporteur</p>
             <p>Vous pouvez consulter les informations en cliquant sur
             <a href="${baseUrl}/acces-lettre-de-voiture?id=${waybill.code}">ce lien</a></p>
             <h3>Veuillez trouver ci-joint votre lettre de voiture</h3>
             <br>
             <p>Fluctuat</p>`
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

  let email: EmailData = {
    to: [
      waybill.order.customer,
      waybill.order.receiver,
      waybill.order.transporter,
      waybill.order.sender,
      { name: '', email: waybill.owner },
    ],
    subject: `⚓  Chargement confirmé -️ Lettre de voiture nº ${waybill.code}`,
    body: {
      text: '',
      html: `<p>Bonjour,</p>
             <p>Le chargement a été confirmé par le transporteur.</p>
             <p>Vous pouvez consulter les informations en cliquant sur
             <a href="${baseUrl}/acces-lettre-de-voiture?id=${waybill.code}">ce lien</a></p>
             <h3>Veuillez trouver ci-joint votre lettre de voiture du chargement.</h3>
             <br>
             <p>Fluctuat</p>`
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
             <p>Fluctuat</p>`
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
             <p>Fluctuat</p>`
    }
  };

  let sms = `Veuillez confirmer le déchargement. ${confirmationLink}`;

  return Promise.all([
    emailService.sendEmail(email),
    smsService.sendSms(transporter.cellphone, sms)
  ]);
};

const sendWaybillNotification = (notifyData: WaybillNotify, baseUrl: string) => {
  const accessLink = `${baseUrl}/acces-lettre-de-voiture?id=${notifyData.waybillId}`;

  let sendActions = [];

  if (notifyData.email) {
    let email: EmailData = {
      to: [ { name: '', email: notifyData.email } ],
      subject: `⛴️ Lien d'accès à la lettre de voiture ${notifyData.waybillId}`,
      body: {
        html: `<p>Bonjour,</p>
                <p>La Lettre de voiture ${notifyData.waybillId} est disponible sur fluctuat.</p>
                <a href="${accessLink}">Cliquez sur ce lien pour y accéder</a>
                <p>Fluctuat</p>`
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

export {
  sendWaybill,
  sendWaybillLoaded,
  sendWaybillLoadValidation,
  sendWaybillUnloadValidation,
  sendWaybillNotification
}

