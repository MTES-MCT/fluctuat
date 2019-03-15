import { Waybill } from '../models/waybill';
import { waybillNotificationEmailBody } from './waybill-notification-email-body';

test('Waybill notification email body', () => {
  const waybill = Waybill.fromObj({
    order: {
      customer: { name: 'a customer', email: 'customer@test' },
      sender: { name: 'a sender', email: 'sender@test' },
      receiver: { name: 'a receiver', email: 'receiver@test' },
      middleman: { name: 'a middleman', email: 'middleman@test' },
      transporter: { name: 'a transporter', email: 'transporter@test' },
      ship: { name: 'a big ship', regNumber: 'FR 123' },
      originInfo: { port: 'Quai du Pecq', expectedDate: '12/03/2019' },
      destinationInfo: { port: 'Quai de Corbeil-Essonnes', expectedDate: '06/03/2019' },
      merchandise: { nature: 'blé', weight: '1000' }
    },
    code: 'ZQ92PU'
  });

  expect(waybillNotificationEmailBody(waybill, 'http://test.url/access/link'))
    .toEqual(`<p>Bonjour,</p>
      <p>La Lettre de voiture nº ZQ92PU est disponible sur fluctuat.</p>
      <p><strong>Information relative au voyage :</strong></p>
      <ul>
        <li>Donneur d'ordre : a customer</li>
        <li>Expéditeur : a sender</li>
        <li>Destinataire : a receiver</li>
        <li>Affréteur : a middleman</li>
        <li>Transporteur : a transporter</li>
        <li>Nature de la marchandise : blé</li>
        <li>Tonnage prévu : 1000</li>
        <li>Date prévue du chargement : 12/03/2019</li>
        <li>Date prévue du déchargement : 06/03/2019</li>
      </ul>
      <a href=\"http://test.url/access/link\">Cliquez sur ce lien pour y accéder</a>
      <br>
      <p>Cordialement,</p>
      <p>L'équipe de Fluctu@t</p>`)
});


test('Waybill notification email body with missing fields', () => {
  const waybill = Waybill.fromObj({
    order: {
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
    .toEqual(`<p>Bonjour,</p>
      <p>La Lettre de voiture nº ZQ92PU est disponible sur fluctuat.</p>
      <p><strong>Information relative au voyage :</strong></p>
      <ul>
        <li>Donneur d'ordre : a customer</li>
        <li>Expéditeur : a sender</li>
        <li>Destinataire : a receiver</li>
        
        <li>Transporteur : a transporter</li>
        <li>Nature de la marchandise : blé</li>
        <li>Tonnage prévu : inconnu</li>
        <li>Date prévue du chargement : inconnue</li>
        <li>Date prévue du déchargement : inconnue</li>
      </ul>
      <a href=\"http://test.url/access/link\">Cliquez sur ce lien pour y accéder</a>
      <br>
      <p>Cordialement,</p>
      <p>L'équipe de Fluctu@t</p>`)
});
