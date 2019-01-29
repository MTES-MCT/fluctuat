import { EmailData } from './email-data';

let account = require('fs').readFileSync('.data/email.config.json');

const mailjet = require('node-mailjet').connect(account.user, account.pass);

const DEFAULT_FROM = {
  email: 'elias.boukamza@beta.gouv.fr',
  name: 'Fluctuat ⛴'
};

const sendMail = async (data: EmailData) => {
  const result = await mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: DEFAULT_FROM.email,
            Name: DEFAULT_FROM.name
          },
          To: [
            {
              Email: data.to.email,
              Name: data.to.name
            }
          ],
          Subject: data.subject,
          TextPart: data.body.text,
          HTMLPart: data.body.html
        }
      ]
    });
  console.log(result.body);
};

export {sendMail}

