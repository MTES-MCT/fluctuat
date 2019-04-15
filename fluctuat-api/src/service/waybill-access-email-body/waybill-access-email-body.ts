import * as nunjucks from 'nunjucks';

const template =
  `<p>Bonjour,</p>
<p>La lettre de voiture nº {{waybillId}} a été confirmé par le transporteur.</p>
<p>Vous pouvez consulter les informations en cliquant sur
  <a href="{{accessLink}}">ce lien</a></p>
<h3>Veuillez trouver ci-joint votre lettre de voiture</h3>
<br>
<p>Cordialement,</p>
<p>L'équipe de Fluctu@t</p>`;

export const waybillAccessEmailBody = (waybillId: string, accessLink: string) =>
  nunjucks.renderString(template, { waybillId, accessLink });
