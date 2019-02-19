import { Waybill } from '../models/waybill';
import { UnloadInfo } from '../models/unload-info';
import { LoadManager } from '../models/load-manager';

const { format } = require('date-fns');
const fr = require('date-fns/locale/fr');

export function waybillDocDefinition(waybill: Waybill, baseUrl: string) {
  const order = waybill.order;
  const loadInfo = waybill.loadInfo;
  const unloadInfo = waybill.unloadInfo;
  return {
    content: [
      { text: `Lettre de voiture nº ${waybill.code}`, style: 'title' },

      chainText('Donneur d\'ordre : ', bold(order.customer.name)),
      chainText('Expéditeur : ', bold(order.sender.name)),
      chainText('Destinataire : ', bold(order.receiver.name)),
      '\n',
      chainText('Le bateau ', bold(order.ship.name), ', matricule ', bold(order.ship.regNumber),
        ' est conduit par ', bold(order.transporter.name), '.'),
      '\n',
      chainText('Il vous est expédié un tonnage de ',
        bold(loadInfo.merchandiseWeight), ' tonnes de ',
        bold(loadInfo.merchandiseType), ' d\'une valeur déclarée de ',
        bold(loadInfo.merchandisePrice + ' €'), ' par tonne, qui a été chargé au ',
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
      printCommentBlock(loadInfo.comments),
      '\n\n',
      ...printLoadValidationBlock(loadInfo, order.transporter.name),
      '\n',
      ...printUnloadBlock(unloadInfo),
      '\n\n',
      ...printUnLoadValidationBlock(unloadInfo, order.transporter.name)
    ],
    footer: [
      {
        text: `Cette lettre de voiture est accesible sur ${baseUrl}`,
        link: `${baseUrl}/acces-lettre-de-voiture?id=${waybill.code}`,
        alignment: 'center'
      }
    ],
    styles: {
      title: {
        fontSize: 18,
        alignment: 'center',
        bold: true,
        marginBottom: 25
      },
      title2: {
        fontSize: 15,
        bold: true,
        marginBottom: 15
      },
      cell: {
        margin: [ 2, 8 ]
      },
      cellHeader: {
        margin: [ 2, 8, 2, 0 ]
      }
    }
  }
}

const printUnloadBlock = (unloadInfo: UnloadInfo) => {
  // if the information is incomplete print empty block
  if (!unloadInfo.validatedAt) {
    return []
  }

  return [
    { text: 'Déchargement', style: 'title2' },

    chainText(bold(unloadInfo.unloadManager.name), ' (', unloadInfo.unloadManager.jobFunction, ') ',
      'est le responsable du déchargement.'),
    '\n',
    chainText('Le déchargement a commencé le ', bold(unloadInfo.unloadStartDate), ' et fini le ',
      bold(unloadInfo.unloadEndDate), '.'),
    '\n',
    chainText('Tonnage déchargé : ', bold(unloadInfo.merchandiseWeight), ' tonnes.'),
    '\n',
    printCommentBlock(unloadInfo.comments),
  ]
};

const printUnLoadValidationBlock = (validationInfo: { sentAt, unloadManager: LoadManager, validatedAt }, transporterName) => {
  // if the information is incomplete print an empty block
  if (!validationInfo.validatedAt) {
    return []
  }

  return [
    {
      columns: [
        {
          width: '50%',
          text: chainText('Envoyé ', format(validationInfo.sentAt, '[le] D MMMM YYYY', { locale: fr }),
            ' par ', validationInfo.unloadManager.name),
        },
        {
          width: '50%',
          text: chainText('Confirmé par ', transporterName, ' ', format(validationInfo.validatedAt,
            '[le] D MMMM YYYY', { locale: fr })),
        }
      ]
    }
  ]
};
// TODO: very similar to printUnload... remove duplication
const printLoadValidationBlock = (validationInfo: { sentAt, loadManager: LoadManager, validatedAt }, transporterName) => {
  // if the information is incomplete print an empty block
  if (!validationInfo.validatedAt) {
    return []
  }

  return [
    {
      columns: [
        {
          width: '50%',
          text: chainText('Envoyé ', format(validationInfo.sentAt, '[le] D MMMM YYYY', { locale: fr }),
            ' par ', validationInfo.loadManager.name),
        },
        {
          width: '50%',
          text: chainText('Confirmé par ', transporterName, ' ', format(validationInfo.validatedAt,
            '[le] D MMMM YYYY', { locale: fr })),
        }
      ]
    }
  ]
};

const printCommentBlock = (comments) => {
  return {
    table: {
      widths: [ '*' ],
      body: [
        [ { text: 'Commentaires', border: [ true, true, true, false ], bold: true, style: 'cellHeader' } ],
        [ { text: comments, border: [ true, false, true, true ], style: 'cell' } ]
      ]
    }
  }
};

const bold = (text: string) => ({ text: text, bold: true });
const chainText = (...parts) => ({ text: [ ...parts ] });
