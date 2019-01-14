const {format} = require('date-fns');
const fr = require('date-fns/locale/fr');

const hasAddress = (address) => address.street && address.zipCode && address.city;
const printAddress = (address) => hasAddress(address) ? `${address.street}, ${address.zipCode} ${address.city}` : '';

const getContent = (contract) => {
  let transporter = contract.transporter;
  let delivery = contract.delivery;
  return {
    content: [
      {text: 'Confirmation de transport', fontSize: 18, alignment: 'center'},
      '\n',
      transporter.name,
      transporter.ship.name,
      printAddress(transporter.address),
      transporter.phone,
      transporter.email,

      {text: delivery.client.name, alignment: 'right'},
      {text: delivery.client.email, alignment: 'right'},
      {
        text: printAddress(delivery.client.address),
        alignment: 'right'
      },
      '\n',
      {
        text: `${transporter.address.city}, ${format(new Date(), '[le] D MMMM YYYY', {locale: fr})}`,
        alignment: 'right'
      },
      '\n\n\n\n',
      'Madame, Monsieur,',
      '\n',
      'Conformément à notre discussion, je vous confirme que je suis disposé à prendre en charge le transport' +
      ' que vous me proposez dans les conditions suivantes :',
      '\n',
      `- Chargement :       le ${delivery.departureDate} à ${delivery.departureTime}`,
      '\n',
      `- Déchargement :   le ${delivery.arrivalDate} à ${delivery.arrivalTime}`,
      '\n',
      `- Marchandise : ${delivery.merchandise.weight} tonnes de ${delivery.merchandise.type}`,
      '\n',
      `- Prix du fret :  ${delivery.price} € par tonne`,
      '\n',
      `- Péages et taxes : prise en charge par le ${delivery.clientPayTaxes ? 'client' : 'transporteur'}`,
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
      '\n\n\n\n',
      {
        columns: [
          {
            width: '50%',
            text: 'Le transporteur'
          },
          {
            width: '50%',
            text: 'Le client'
          }
        ]
      },
      '\n',
      {
        columns: [
          {
            width: '50%',
            text: `Signé le ${format(contract.createdAt, 'D MMMM YYYY [à] H[h] mm', {locale: fr})}`
          },
          {
            width: '50%',
            text: contract.acceptedAt ?  `Signé le ${format(contract.acceptedAt, 'D MMMM YYYY [à] H[h] mm', {locale: fr})}`: ''
          }
        ]
      }
    ]
  };
};

module.exports = {
  transportConfirmation: getContent
};
