import * as nunjucks from 'nunjucks';
import { Waybill } from '../../models/waybill';

const template = `<p>Bonjour,</p>
<p>La lettre de voiture nº {{waybill.code}} a été confirmé par le transporteur.</p>
<p><strong>Information relative au voyage :</strong></p>
<ul>
  <li>Donneur d'ordre : {{waybill.orderInfo.customer.name}}</li>
  <li>Expéditeur : {{waybill.orderInfo.sender.name}}</li>
  <li>Destinataire : {{waybill.orderInfo.receiver.name}}</li>
  {% if waybill.orderInfo.middleman.name %}<li>Affréteur : {{waybill.orderInfo.middleman.name}}</li>{% endif %}
  <li>Transporteur : {{waybill.orderInfo.transporter.name}}</li>
  <li>Nature de la marchandise : {{waybill.orderInfo.merchandise.nature}}</li>
  <li>Tonnage chargé : {{waybill.loadInfo.merchandiseWeight}}</li>
  <li>Date prévue du déchargement :
   {{ waybill.orderInfo.destinationInfo.expectedDate if waybill.orderInfo.destinationInfo.expectedDate else "inconnue" }}</li>
</ul>
<p>Pour consulter les informations ou <strong>commencer le déchargement</strong>, cliquez sur
<a href="{{accessLink}}">ce lien</a></p>
<p>Veuillez trouver ci-joint la lettre de voiture du chargement.</p>
<br>
<p>Cordialement,</p>
<p>L'équipe de Fluctu@t</p>`;

export const waybillLoadedEmailBody = (waybill: Waybill, accessLink: string) =>
  nunjucks.renderString(template, { waybill, accessLink });
