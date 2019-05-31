import * as nunjucks from 'nunjucks';

import { Waybill } from '../../models/waybill';
const template =
  `<p>Bonjour,</p>
<p>La Lettre de voiture nº {{waybill.code}} est disponible sur fluctuat.</p>
<p><strong>Information relative au voyage :</strong></p>
<ul>
  <li>Donneur d'ordre : {{waybill.orderInfo.customer.name}}</li>
  <li>Expéditeur : {{waybill.orderInfo.sender.name}}</li>
  <li>Destinataire : {{waybill.orderInfo.receiver.name}}</li>
  {% if waybill.orderInfo.middleman.name %}<li>Affréteur : {{waybill.orderInfo.middleman.name}}</li>{% endif %}
  <li>Transporteur : {{waybill.orderInfo.transporter.name}}</li>
  <li>Nature de la marchandise : {{waybill.orderInfo.merchandise.nature}}</li>
  <li>Tonnage prévu : {{waybill.orderInfo.merchandise.weight if waybill.orderInfo.merchandise.weight else "inconnu"}}</li>
  <li>Date prévue du chargement : {{ waybill.orderInfo.originInfo.expectedDate if waybill.orderInfo.originInfo.expectedDate else "inconnue" }}</li>
  <li>Date prévue du déchargement :
  {{ waybill.orderInfo.destinationInfo.expectedDate if waybill.orderInfo.destinationInfo.expectedDate else "inconnue" }}</li>
</ul>
<a href="{{accessLink}}">Cliquez sur ce lien pour y accéder</a>
<br>
<p>Cordialement,</p>
<p>L'équipe de Fluctu@t</p>`;

export const waybillNotificationEmailBody = (waybill: Waybill, accessLink: string) =>
  nunjucks.renderString(template, { waybill, accessLink });
