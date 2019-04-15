import * as nunjucks from 'nunjucks';

const template = `<p>Bienvenue sur Fluctu@t,</p>
<p>Votre compte a été crée, pour l'activer vous devez choisir votre mot de passe et vous connecter.</p>
<p>Suivez ce lien pour finir l'activation de votre compte :</p>
<p><a href="{{changePasswordLink}}">Activer mon compte</a></p>
<br>
<p>Cordialement,</p>
<p>L'équipe de Fluctu@t</p>`;

export const welcomeEmailBody = (changePasswordLink) =>
  nunjucks.renderString(template, { changePasswordLink });
