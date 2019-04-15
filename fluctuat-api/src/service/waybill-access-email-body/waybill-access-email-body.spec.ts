import { waybillAccessEmailBody } from './waybill-access-email-body';

test('Waybill access link email body', () => {
  const body = waybillAccessEmailBody('C0D3', 'http://test.url/access/link');

  expect(body)
    .toEqual('<p>Bonjour,</p>\n' +
      '<p>La lettre de voiture nº C0D3 a été confirmé par le transporteur.</p>\n' +
      '<p>Vous pouvez consulter les informations en cliquant sur\n' +
      '  <a href="http://test.url/access/link">ce lien</a></p>\n' +
      '<h3>Veuillez trouver ci-joint votre lettre de voiture</h3>\n' +
      '<br>\n' +
      '<p>Cordialement,</p>\n' +
      '<p>L\'équipe de Fluctu@t</p>');
});
