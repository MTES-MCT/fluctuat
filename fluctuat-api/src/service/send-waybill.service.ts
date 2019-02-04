import { getDocDefinition } from '../pdf/waybill-pdf';
import { generatePdf } from '../pdf/generate-pdf';
import { EmailService } from '../email/email.service';
import { Waybill } from '../models/waybill';
import { EmailData } from '../email/email-data';

let account = JSON.parse(require('fs').readFileSync('.data/email.config.json'));

let emailService = new EmailService(account.user, account.pass);

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

const sendWaybillLoadValidation = (waybill: Waybill, baseUrl: string) => {
  let transporter = waybill.order.transporter;
  let validationLink = `${baseUrl}/lettre-de-voiture/${waybill.id}/validation-chargement`;

  let email: EmailData = {
    to: [transporter],
    subject: `⚓ Chargement à valider - Lettre de voiture nº ${waybill.id}`,
    body: {
      html: `<p>Bonjour ${transporter.name},</p>
             <p>Les informations sur le chargement de la lettre de voiture nº ${waybill.id} ont été enregistrés,
              veuillez les valider dès maintenant.</p>
             <a href="${validationLink}">Cliquer sur ce lien pour accéder à votre lettre de voiture</a>
             <p>Fluctuat</p>`
    }
  };

  return emailService.sendEmail(email);
};

const sendWaybillUnloadValidation = (waybill: Waybill, baseUrl: string) => {
  let transporter = waybill.order.transporter;
  let validationLink = `${baseUrl}/lettre-de-voiture/${waybill.id}/validation-dechargement`;

  let email: EmailData = {
    to: [transporter],
    subject: `⚓ Déchargement à valider - Lettre de voiture nº ${waybill.id}`,
    body: {
      html: `<p>Bonjour ${transporter.name},</p>
             <p>Les informations sur le déchargement de la lettre de voiture nº ${waybill.id} ont été enregistrés,
              veuillez les valider dès maintenant.</p>
             <a href="${validationLink}">Cliquer sur ce lien pour accéder à votre lettre de voiture</a>
             <p>Fluctuat</p>`
    }
  };

  return emailService.sendEmail(email);
};

export { sendWaybill, sendWaybillLoadValidation, sendWaybillUnloadValidation }
