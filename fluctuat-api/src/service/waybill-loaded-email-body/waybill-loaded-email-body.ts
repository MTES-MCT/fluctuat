import * as nunjucks from 'nunjucks';
import { Waybill } from '../../models/waybill';

const template = `<p>Bonjour,</p>
<p>La lettre de voiture nº {{waybill.code}} a été confirmé par le transporteur.</p>
<p><strong>Information relative au voyage :</strong></p>
<ul>
  <li>Donneur d'ordre : {{waybill.order.customer.name}}</li>
  <li>Expéditeur : {{waybill.order.sender.name}}</li>
  <li>Destinataire : {{waybill.order.receiver.name}}</li>
  {% if waybill.order.middleman.name %}<li>Affréteur : {{waybill.order.middleman.name}}</li>{% endif %}
  <li>Transporteur : {{waybill.order.transporter.name}}</li>
  <li>Nature de la marchandise : {{waybill.order.merchandise.nature}}</li>
  <li>Tonnage chargé : {{waybill.loadInfo.merchandiseWeight}}</li>
  <li>Date prévue du déchargement :
   {{ waybill.order.destinationInfo.expectedDate if waybill.order.destinationInfo.expectedDate else "inconnue" }}</li>
</ul>
<p>Pour consulter les informations ou <strong>commencer le déchargement</strong>, cliquez sur
<a href="{{accessLink}}">ce lien</a></p>
<p>Veuillez trouver ci-joint la lettre de voiture du chargement.</p>
<br>
<p>Cordialement,</p>
<p>L'équipe de Fluctu@t</p>`;

export const waybillLoadedEmailBody = (waybill: Waybill, accessLink: string) =>
  nunjucks.renderString(template, { waybill, accessLink });