import { waybillUnLoadValidationEmailBody } from './waybill-unload-validation-email-body';

test('Waybill load validation email body', () => {

  const body = waybillUnLoadValidationEmailBody('Blas', 'C0D3', 'http://test.url/confirm/link');
  expect(body)
    .toEqual('<p>Bonjour Blas,</p>\n' +
      '<p>Les informations sur le déchargement de la lettre de voiture nº C0D3 ont été enregistrées,\n' +
      '  veuillez les confirmer dès maintenant.</p>\n' +
      '<a href="http://test.url/confirm/link">Cliquer sur ce lien pour accéder à votre lettre de voiture</a>\n' +
      '<br>\n' +
      '<p>Cordialement,</p>\n' +
      '<p>L\'équipe de Fluctu@t</p>');
});
