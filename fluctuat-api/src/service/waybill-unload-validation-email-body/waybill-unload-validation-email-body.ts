import * as nunjucks from 'nunjucks';

const template = `<p>Bonjour {{name}},</p>
<p>Les informations sur le déchargement de la lettre de voiture nº {{waybillId}} ont été enregistrées,
  veuillez les confirmer dès maintenant.</p>
<a href="{{confirmationLink}}">Cliquer sur ce lien pour accéder à votre lettre de voiture</a>
<br>
<p>Cordialement,</p>
<p>L'équipe de Fluctu@t</p>`;

export const waybillUnLoadValidationEmailBody = (name, waybillId, confirmationLink) =>
  nunjucks.renderString(template, { name, waybillId, confirmationLink });
