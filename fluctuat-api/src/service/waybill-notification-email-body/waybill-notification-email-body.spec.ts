import { Waybill } from '../../models/waybill';
import { waybillNotificationEmailBody } from './waybill-notification-email-body';

test('Waybill notification email body', () => {
  const waybill = Waybill.fromObj({
    orderInfo: {
      customer: { name: 'a customer', email: 'customer@test' },
      sender: { name: 'a sender', email: 'sender@test' },
      receiver: { name: 'a receiver', email: 'receiver@test' },
      middleman: { name: 'a middleman', email: 'middleman@test' },
      transporter: { name: 'a transporter', email: 'transporter@test' },
      ship: { name: 'a big ship', regNumber: 'FR 123' },
      originInfo: { port: 'Quai du Pecq', expectedDate: '12/03/2019' },
      destinationInfo: { port: 'Quai de Corbeil-Essonnes', expectedDate: '14/03/2019' },
      merchandise: { nature: 'blé', weight: '1000' }
    },
    code: 'ZQ92PU'
  });

  expect(waybillNotificationEmailBody(waybill, 'http://test.url/access/link'))
    .toEqual('<p>Bonjour,</p>\n' +
      '<p>La Lettre de voiture nº ZQ92PU est disponible sur fluctuat.</p>\n' +
      '<p><strong>Information relative au voyage :</strong></p>\n' +
      '<ul>\n' +
      '  <li>Donneur d\'ordre : a customer</li>\n' +
      '  <li>Expéditeur : a sender</li>\n' +
      '  <li>Destinataire : a receiver</li>\n' +
      '  <li>Affréteur : a middleman</li>\n' +
      '  <li>Transporteur : a transporter</li>\n' +
      '  <li>Nature de la marchandise : blé</li>\n' +
      '  <li>Tonnage prévu : 1000</li>\n' +
      '  <li>Date prévue du chargement : 12/03/2019</li>\n' +
      '  <li>Date prévue du déchargement :\n' +
      '  14/03/2019</li>\n' +
      '</ul>\n' +
      '<a href="http://test.url/access/link">Cliquez sur ce lien pour y accéder</a>\n' +
      '<br>\n' +
      '<p>Cordialement,</p>\n' +
      '<p>L\'équipe de Fluctu@t</p>');
});

test('Waybill notification email body with missing fields', () => {
  const waybill = Waybill.fromObj({
    orderInfo: {
      customer: { name: 'a customer', email: 'customer@test' },
      sender: { name: 'a sender', email: 'sender@test' },
      receiver: { name: 'a receiver', email: 'receiver@test' },
      middleman: {},
      transporter: { name: 'a transporter', email: 'transporter@test' },
      ship: { name: 'a big ship', regNumber: 'FR 123' },
      originInfo: { port: 'Quai du Pecq' },
      destinationInfo: { port: 'Quai de Corbeil-Essonnes' },
      merchandise: { nature: 'blé' }
    },
    code: 'ZQ92PU'
  });

  expect(waybillNotificationEmailBody(waybill, 'http://test.url/access/link'))
    .not.toContain(`Affréteur`);
});
