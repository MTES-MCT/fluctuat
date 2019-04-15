import { Waybill } from '../../models/waybill';
import { waybillLoadedEmailBody } from './waybill-loaded-email-body';

test('Waybill loaded email body', () => {
  const waybill = Waybill.fromObj({
    code: 'ZQ92PU',
    order: {
      customer: { name: 'a customer' },
      sender: { name: 'a sender' },
      receiver: { name: 'a receiver' },
      middleman: { name: 'a middleman' },
      transporter: { name: 'a transporter' },
      destinationInfo: { expectedDate: '06/03/2019' },
      merchandise: { nature: 'blé', weight: '1000' }
    },
    loadInfo: {
      merchandiseWeight: '1000',
    }
  });

  expect(waybillLoadedEmailBody(waybill, 'http://test.url/access/link'))
    .toEqual('<p>Bonjour,</p>\n' +
      '<p>La lettre de voiture nº ZQ92PU a été confirmé par le transporteur.</p>\n' +
      '<p><strong>Information relative au voyage :</strong></p>\n' +
      '<ul>\n' +
      '  <li>Donneur d\'ordre : a customer</li>\n' +
      '  <li>Expéditeur : a sender</li>\n' +
      '  <li>Destinataire : a receiver</li>\n' +
      '  <li>Affréteur : a middleman</li>\n' +
      '  <li>Transporteur : a transporter</li>\n' +
      '  <li>Nature de la marchandise : blé</li>\n' +
      '  <li>Tonnage chargé : 1000</li>\n' +
      '  <li>Date prévue du déchargement : 06/03/2019</li>\n' +
      '</ul>\n' +
      '<p>Pour consulter les informations ou <strong>commencer le déchargement</strong>, cliquez sur\n' +
      '<a href=\"http://test.url/access/link\">ce lien</a></p>\n' +
      '<p>Veuillez trouver ci-joint la lettre de voiture du chargement.</p>\n' +
      '<br>\n' +
      '<p>Cordialement,</p>\n' +
      '<p>L\'équipe de Fluctu@t</p>\n');
});
