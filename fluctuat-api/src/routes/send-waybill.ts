import { getDocDefinition } from '../waybill-pdf';
import { generatePdf } from '../generate-pdf';
import { EmailService } from '../email/email.service';

let account = JSON.parse(require('fs').readFileSync('.data/email.config.json'));

let emailService = new EmailService(account.user, account.pass);

export function sendWaybill(waybill) {
  let email = {
    to: [
      waybill.order.customer,
      waybill.order.receiver,
      waybill.order.transporter,
      waybill.order.sender
    ],
    subject: `Lettre de voiture ${waybill.id}`,
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
}


