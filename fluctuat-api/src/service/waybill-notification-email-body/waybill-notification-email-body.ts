import * as nunjucks from 'nunjucks';

import { Waybill } from '../../models/waybill';

const template =
  `<p>Bonjour,</p>
<p>La Lettre de voiture nº {{waybill.code}} est disponible sur fluctuat.</p>
<p><strong>Information relative au voyage :</strong></p>
<ul>
  <li>Donneur d'ordre : {{waybill.order.customer.name}}</li>
  <li>Expéditeur : {{waybill.order.sender.name}}</li>
  <li>Destinataire : {{waybill.order.receiver.name}}</li>
  {% if waybill.order.middleman.name %}<li>Affréteur : {{waybill.order.middleman.name}}</li>{% endif %}
  <li>Transporteur : {{waybill.order.transporter.name}}</li>
  <li>Nature de la marchandise : {{waybill.order.merchandise.nature}}</li>
  <li>Tonnage prévu : {{waybill.order.merchandise.weight if waybill.order.merchandise.weight else "inconnu"}}</li>
  <li>Date prévue du chargement : {{ waybill.order.originInfo.expectedDate if waybill.order.originInfo.expectedDate else "inconnue" }}</li>
  <li>Date prévue du déchargement :
  {{ waybill.order.destinationInfo.expectedDate if waybill.order.destinationInfo.expectedDate else "inconnue" }}</li>
</ul>
<a href="{{accessLink}}">Cliquez sur ce lien pour y accéder</a>
<br>
<p>Cordialement,</p>
<p>L'équipe de Fluctu@t</p>`;

export const waybillNotificationEmailBody = (waybill: Waybill, accessLink: string) =>
  nunjucks.renderString(template, { waybill, accessLink });
