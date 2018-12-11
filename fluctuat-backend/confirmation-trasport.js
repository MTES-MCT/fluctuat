const {format} = require('date-fns');
const fr = require('date-fns/locale/fr');

const getContent = (transporter, delivery) => ({
  content: [
    {text: 'Confirmation de transport', fontSize: 18, alignment: 'center'},
    '\n',
    transporter.name,
    transporter.ship.name,
    `${transporter.address.street}, ${transporter.address.zipCode}, ${transporter.address.city}`,
    transporter.phone,
    transporter.email,

    {text: delivery.client.name, alignment: 'right'},
    {
      text: `${delivery.client.address.street}, ${delivery.client.address.zipCode}, ${delivery.client.address.city}`,
      alignment: 'right'
    },
    '\n',
    {text: `${transporter.address.city}, ${format(new Date(), '[le] D MMMM YYYY', {locale: fr})}`, alignment: 'right'},
    '\n',
    'Madame, Monsieur,',
    '\n',
    'Conformément à notre discussion, je vous confirme que je suis disposé à prendre en charge le transport' +
    ' que vous me proposez dans les conditions suivantes :',
    '\n',
    `- Chargement :       ${format(delivery.departureTime, '[le] D MMMM YYYY [à] H[h] mm', {locale: fr})}`,
    '\n',
    `- Déchargement :   ${format(delivery.arrivalTime, '[le] D MMMM YYYY [à] H[h] mm', {locale: fr})}`,
    '\n',
    `- Marchandise : ${delivery.weight} tonnes de ${delivery.type}`,
    '\n',
    `- Prix du fret :  ${delivery.price} € par tonne`,
    '\n',
    `- Péages et taxes : prise en charge par le courtier/client (tiers payant):  ${delivery.clientPayTaxes ? 'Oui' : 'Non'}`,
    '\n',
    ' - Délais de planche dont nous avons convenu :',
    '\n',
    {
      ul: [
        ` ${delivery.loadDelay}  jours au chargement`,
        ` ${delivery.unloadDelay}  jours au déchargement`
      ]
    },
    '\n',
    ' - Surestaries dont nous avons convenu :',
    '\n',
    {
      ul: [
        ` ${delivery.delayPenalty} € par jour`
      ]
    },
    '\n',
    '\n',
    '\n',
    '\n',
    '\n',
    'Signature du transporteur                       Signature du client',
    '(précédée de la date)                               (précédée de la date) '

  ]
});

module.exports = {
  getContent: getContent
};
