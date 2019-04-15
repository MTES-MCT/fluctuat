import * as nunjucks from 'nunjucks';

const template =
  `<p>Bonjour {{name}},</p>
<p>Les informations sur le chargement de la lettre de voiture nº {{waybillId}} ont été enregistrées,
  veuillez les confirmer dès maintenant.</p>
<a href="{{confirmationLink}}">Cliquez sur ce lien pour accéder à votre lettre de voiture</a>
<br>
<p>Cordialement,</p>
<p>L'équipe de Fluctu@t</p>`;

export const waybillLoadValidationEmailBody = (name, waybillId, confirmationLink) =>
  nunjucks.renderString(template, { name, waybillId, confirmationLink });
