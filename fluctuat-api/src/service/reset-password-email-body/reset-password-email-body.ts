import * as nunjucks from 'nunjucks';

const template =
  `<p>Bonjour,</p>
<p>Vous avez demandé une réinitialisation du mot de passe,
  il suffit de cliquer sur le lien ci-dessous afin de le modifier.</p>
<p><a href="{{changePasswordLink}}">Changer mon mot de passe</a></p>
<br>
<p>Si vous n'êtes pas à l'origine de cette demande, n'hésitez pas à nous contacter.
  Il vous suffit de répondre à cet email.</p>
<p>Cordialement,</p>
<p>L'équipe de Fluctu@t</p>`;

export const resetPasswordEmailBody = (changePasswordLink) => nunjucks.renderString(template, { changePasswordLink });
