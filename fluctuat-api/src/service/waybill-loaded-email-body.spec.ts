import { waybillLoadedEmailBody } from './waybill-loaded-email-body';
import { Waybill } from '../models/waybill';

test('Waybill loaded email body', () => {
  const waybill = Waybill.fromObj({
    order: {
      customer: { name: 'a customer', email: 'customer@test' },
      sender: { name: 'a sender', email: 'sender@test' },
      receiver: { name: 'a receiver', email: 'receiver@test' },
      middleman: { name: 'a middleman', email: 'middleman@test'},
      transporter: { name: 'a transporter', email: 'transporter@test' },
      ship: { name: 'a big ship', regNumber: 'FR 123' },
      originInfo: { port: 'Quai du Pecq', expectedDate: '12/03/2019' },
      destinationInfo: { port: 'Quai de Corbeil-Essonnes', expectedDate: '06/03/2019' },
      merchandise: { nature: 'blé', weight: '1000' }
    },
    loadInfo: {
      merchandiseWeight: '1000',
      startDate: '12/03/2019, 12:00',
      endDate: '14/03/2019, 12:00',
      comments: 'ras',
      loadManager: {
        name: 'fred dick',
        jobFunction: 'grand chef'
      }
    },
    code: 'ZQ92PU'
  });

  expect(waybillLoadedEmailBody(waybill, 'http://test.url/access/link'))
    .toEqual(`<p>Bonjour,</p>
      <p>La lettre de voiture nº ZQ92PU a été confirmé par le transporteur.</p>
      <p><strong>Information relative au voyage :</strong></p>
      <ul>
        <li>Donneur d'ordre : a customer</li>
        <li>Expéditeur : a sender</li>
        <li>Destinataire : a receiver</li>
        <li>Affréteur : a middleman</li>
        <li>Transporteur : a transporter</li>
        <li>Nature de la marchandise : blé</li>
        <li>Tonnage chargé : 1000</li>
        <li>Date prévue du déchargement : 06/03/2019</li>
      </ul>
      <p>Pour consulter les informations ou <strong>commencer le déchargement</strong>, cliquez sur
      <a href=\"http://test.url/access/link\">ce lien</a></p>
      <p>Veuillez trouver ci-joint la lettre de voiture du chargement.</p>
      <br>
      <p>Cordialement,</p>
      <p>L'équipe de Fluctu@t</p>`)
});
