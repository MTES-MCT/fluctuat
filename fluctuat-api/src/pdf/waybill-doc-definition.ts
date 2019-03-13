import { Waybill } from '../models/waybill';
import { LoadManager } from '../models/load-manager';
import { logo } from './logo';
import { LoadInfo } from '../models/load-info';
import { Middleman } from '../models/middleman';
import { OrderInfo } from '../models/order-info';

const { format } = require('date-fns');
const fr = require('date-fns/locale/fr');

export function waybillDocDefinition(waybill: Waybill, baseUrl: string) {
  const order = waybill.order;
  const loadInfo = waybill.loadInfo;
  const unloadInfo = waybill.unloadInfo;
  return {
    content: [
      {
        columns: [
          { width: 110, image: logo, },
          { width: '*', text: `\nLettre de voiture nº ${waybill.code}`, style: 'title', }
        ],
        style: 'level'
      },
      ...printOrderInfo(order),
      ...printLoadBlock(loadInfo, order),
      ...printValidationBlock(loadInfo),
      ...printUnloadBlock(unloadInfo, order),
      ...printValidationBlock(unloadInfo)
    ],
    footer: [
      {
        text: `Cette lettre de voiture est générée par le service numérique de l'État Fluctu@t`,
        alignment: 'center',
        style: ['level', 'footer']
      },
      {
        text: `Consultable sur ${baseUrl}`,
        link: `${baseUrl}/acces-lettre-de-voiture?id=${waybill.code}`,
        alignment: 'center',
        style: ['footer']
      }
    ],
    styles: {
      title: {
        fontSize: 16,
        bold: true,
        alignment: 'center'
      },
      title2: {
        fontSize: 15,
        bold: true,
        marginBottom: 10,
        marginTop: 10
      },
      small: {
        fontSize: 10,
        marginTop: 4
      },
      footer: {
        fontSize: 10
      },
      level: {
        marginBottom: 5
      },
      cell: {
        margin: [ 2, 8 ]
      },
      cellHeader: {
        margin: [2, 8, 2, 0]
      }
    }
  }
}

const printMiddleMan = (middleman: Middleman) => {
  if (!middleman || !middleman.name) {
    return []
  }

  return [chainText('Affréteur : ', bold(middleman.name),
    ' en sa qualité de ', bold(`${middleman.isBroker ? 'courtier' : 'commissionnaire'}`))]
};

const printOrderInfo = (order: OrderInfo) => {

  const priceText = order.merchandise.price ?
    [' d\'une valeur déclarée de ', bold((order.merchandise.price || '/') + ' €'), ' par tonne'] :
    [' (sans valeur déclarée)'];

  return [
    chainText('Donneur d\'ordre : ', bold(order.customer.name)),
    chainText('Expéditeur : ', bold(order.sender.name)),
    chainText('Destinataire : ', bold(order.receiver.name)),
    ...printMiddleMan(order.middleman),
    chainText('Le bateau ', bold(order.ship.name), ', matricule ', bold(order.ship.regNumber),
      ', est conduit par ', bold(order.transporter.name), '.'),
    { text: 'Informations préalables au voyage', style: 'title2' },
    {
      text: [
        'Il est prévu d’expédier un tonnage de ', bold(order.merchandise.weight), ' tonnes de ',
        bold(order.merchandise.nature), ...priceText, ` que le transporteur s’engage à transporter depuis le `,
        bold(order.originInfo.port), ', le ', bold(order.originInfo.expectedDate),
        ', jusqu\'au ', bold(order.destinationInfo.port), ', le ', bold(order.destinationInfo.expectedDate), '.'
      ], style: 'level'
    }
  ]
};

const printLoadBlock = (loadInfo: LoadInfo, order: OrderInfo) => {
  return [
    { text: 'Chargement', style: 'title2' },
    chainText('Le transporteur déclare avoir reçu ', bold(loadInfo.merchandiseWeight), ' tonnes de ',
      bold(order.merchandise.nature), ' au ', bold(order.originInfo.port), '.'),
    chainText('Le chargement, commencé le ', bold(loadInfo.startDate), ' s\'est terminé le ',
      bold(loadInfo.endDate), '.'),
    '\n',
    printCommentBlock(loadInfo.comments),
  ]
};

const printUnloadBlock = (unloadInfo: LoadInfo, order: OrderInfo) => {
  // if the information is incomplete print empty block
  if (!unloadInfo.validatedAt) {
    return []
  }

  return [
    { text: 'Déchargement', style: 'title2' },
    chainText('Le transporteur déclare avoir remis ', bold(unloadInfo.merchandiseWeight), ' tonnes de ',
      bold(order.merchandise.nature), ' au ', bold(order.destinationInfo.port), '.'),
    chainText('Le déchargement, commencé le ', bold(unloadInfo.startDate), ' s\'est terminé le ',
      bold(unloadInfo.endDate), '.'),
    '\n',
    printCommentBlock(unloadInfo.comments),
  ]
};

const printValidationBlock = (validationInfo: { validatedAt, sentAt, loadManager: LoadManager }) => {
  // if the information is incomplete print an empty block
  if (!validationInfo.validatedAt) {
    return []
  }

  const frenchFullDate = (date) => format(date, 'D MMMM YYYY [à] H[h] mm', { locale: fr });

  return [
    {
      text: ['Validé le ', frenchFullDate(validationInfo.sentAt), ' par ', bold(validationInfo.loadManager.name),
        ' en sa qualité de ', bold(validationInfo.loadManager.jobFunction)],
      style: 'small'
    },
    {
      text: ['Confirmé par le transporteur le ', frenchFullDate(validationInfo.validatedAt)],
      style: 'small'
    }
  ]
};

const printCommentBlock = (comments) => {
  return {
    table: {
      widths: ['*'],
      body: [
        [{ text: 'Commentaires', border: [true, true, true, false], bold: true, style: 'cellHeader' }],
        [{ text: comments, border: [true, false, true, true], style: 'cell' }]
      ]
    }
  }
};

const bold = (text: string) => ({ text: text ? text.toUpperCase() : '', bold: true });
const chainText = (...parts) => ({ text: [...parts], style: 'level' });
