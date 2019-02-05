import { Waybill } from '../models/waybill';

const { format } = require('date-fns');
const fr = require('date-fns/locale/fr');

export function getDocDefinition(waybill: Waybill) {
  const order = waybill.order;
  const loadInfo = waybill.loadInfo;
  const unloadInfo = waybill.unloadInfo;
  return {
    content: [
      { text: `Lettre de voiture nº ${waybill.id}`, style: 'title' },

      chainText('Donneur d\'ordre : ', bold(order.customer.name)),
      chainText('Expéditeur : ', bold(order.sender.name)),
      chainText('Destinataire : ', bold(order.receiver.name)),
      '\n',
      chainText('Le Bateau ', bold(order.ship.name), ', matricule ', bold(order.ship.regNumber),
        ' est conduit par ', bold(order.transporter.name), '.'),
      '\n',
      chainText('Il vous est expédié un tonnage de ',
        bold(loadInfo.merchandiseWeight), ' tonnes de ',
        bold(loadInfo.merchandiseType), ' d\'une valeur déclarée de ',
        bold(loadInfo.merchandisePrice + ' €'), '  par tonne, qui a été chargé au ',
        bold(loadInfo.origin), ' et que le transporteur déclare avoir reçu et s\'engage à transporter au ',
        bold(loadInfo.destination), '.'),
      '\n',
      { text: 'Chargement', style: 'title2' },

      chainText(bold(loadInfo.loadManager.name), ' (', loadInfo.loadManager.jobFunction, ') ',
        'est le responsable du chargement.'),
      '\n',
      chainText('Le chargement a commencé le ', bold(loadInfo.loadStartDate), ' et fini le ',
        bold(loadInfo.loadEndDate), '.'),
      '\n',
      chainText('Tonnage chargé : ', bold(loadInfo.merchandiseWeight), ' tonnes.'),
      '\n',
      { text: 'Commentaires', style: 'title3' },
      loadInfo.comments,
      '\n',
      {
        columns: [
          {
            width: '50%',
            text: chainText('Envoyé ', format(loadInfo.sentAt, '[le] D MMMM YYYY', { locale: fr }),
              ' par ', loadInfo.loadManager.name),
          },
          {
            width: '50%',
            text: chainText('Confirmé par ', order.transporter.name, format(loadInfo.validatedAt,
              '[ le] D MMMM YYYY', { locale: fr })),
          }
        ]
      },
      '\n',
      { text: 'Déchargement', style: 'title2' },

      chainText(bold(unloadInfo.unloadManager.name), ' (', unloadInfo.unloadManager.jobFunction, ') ',
        'est le responsable du déchargement.'),
      '\n',
      chainText('Le déchargement a commencé le ', bold(unloadInfo.unloadStartDate), ' et fini le ',
        bold(unloadInfo.unloadEndDate), '.'),
      '\n',
      chainText('Tonnage déchargé : ', bold(unloadInfo.merchandiseWeight), ' tonnes.'),
      '\n',
      { text: 'Commentaires', style: 'title3' },
      unloadInfo.comments,
      '\n',
      {
        columns: [
          {
            width: '50%',
            text: chainText('Envoyé ', format(unloadInfo.sentAt, '[le] D MMMM YYYY', { locale: fr }),
              ' par ', unloadInfo.unloadManager.name),
          },
          {
            width: '50%',
            text: chainText('Confirmé par ', order.transporter.name, format(unloadInfo.validatedAt,
              '[ le] D MMMM YYYY', { locale: fr })),
          }
        ]
      },


    ],
    styles: {
      title: {
        fontSize: 18,
        alignment: 'center',
        bold: true,
        marginBottom: 15
      },
      title2: {
        fontSize: 16,
        bold: true,
        marginBottom: 15
      },
      title3: {
        fontSize: 14,
        bold: true,
        marginBottom: 15
      },
      bold: {
        bold: true
      }
    }
  }
}


const bold = (text: string) => ({ text: text, style: 'bold' });
const chainText = (...parts) => ({ text: [...parts] });
