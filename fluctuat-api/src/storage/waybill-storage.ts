import { Document, model, Model } from 'mongoose';
import { Waybill } from '../models/waybill';
import { WaybillSchema } from './schemas/waybill.schema';

interface WaybillDocument extends Waybill, Document {
}

const WaybillDao: Model<WaybillDocument> = model<WaybillDocument>('Waybill', WaybillSchema);

const get = (code) => WaybillDao.findOne({ code });

const put = (waybill: Waybill) => new WaybillDao(waybill).save();

const getAll = () => {
  return WaybillDao.find()
    .sort({ 'orderInfo.sentAt': 'desc', });
};

const findByEmail = (email: string) => {
  return WaybillDao.find({
    $or: [
      { owner: email },
      { 'orderInfo.customer.email': email },
      { 'orderInfo.sender.email': email },
      { 'orderInfo.receiver.email': email },
      { 'orderInfo.middleman.email': email },
      { 'orderInfo.transporter.email': email },
      { 'orderInfo.originInfo.email': email },
      { 'orderInfo.destinationInfo.email': email },
    ]
  })
    .sort({ 'orderInfo.sentAt': 'desc', });
};

const findContacts = (owner: string) => {
  const $filterNullAndEmpty = (field) => {
    return {
      $filter: {
        input: field,
        as: 'item',
        cond: { $and: [{ $ne: ['$$item', null] }, { $ne: ['$$item', ''] }] }
      }
    };
  };

  return WaybillDao.aggregate([
    { $match: { owner } },
    {
      $group: {
        _id: '$owner',
        customerNames: { $addToSet: '$orderInfo.customer.name' },
        customerEmails: { $addToSet: '$orderInfo.customer.email' },
        senderNames: { $addToSet: '$orderInfo.sender.name' },
        senderEmails: { $addToSet: '$orderInfo.sender.email' },
        receiverNames: { $addToSet: '$orderInfo.receiver.name' },
        receiverEmails: { $addToSet: '$orderInfo.receiver.email' },
        middlemanNames: { $addToSet: '$orderInfo.middleman.name' },
        middlemanEmails: { $addToSet: '$orderInfo.middleman.email' },
        transporterNames: { $addToSet: '$orderInfo.transporter.name' },
        transporterEmails: { $addToSet: '$orderInfo.transporter.email' },
        transporterCellphones: { $addToSet: '$orderInfo.transporter.cellphone' },
        shipNames: { $addToSet: '$orderInfo.ship.name' },
        shipRegNumbers: { $addToSet: '$orderInfo.ship.regNumber' },
        loadManagerEmails: { $addToSet: '$orderInfo.originInfo.email' },
        unloadManagerEmails: { $addToSet: '$orderInfo.destinationInfo.email' },
        customers: { $addToSet: '$orderInfo.customer' },
        senders: { $addToSet: '$orderInfo.sender' },
        receivers: { $addToSet: '$orderInfo.receiver' },
        middlemen: { $addToSet: '$orderInfo.middleman' },
        transporters: { $addToSet: '$orderInfo.transporter' },
        ships: { $addToSet: '$orderInfo.ship' }
      }
    },
    {
      $addFields: {
        customerNames: $filterNullAndEmpty('$customerNames'),
        customerEmails: $filterNullAndEmpty('$customerEmails'),
        senderNames: $filterNullAndEmpty('$senderNames'),
        senderEmails: $filterNullAndEmpty('$senderEmails'),
        receiverNames: $filterNullAndEmpty('$receiverNames'),
        receiverEmails: $filterNullAndEmpty('$receiverEmails'),
        middlemanNames: $filterNullAndEmpty('$middlemanNames'),
        middlemanEmails: $filterNullAndEmpty('$middlemanEmails'),
        transporterNames: $filterNullAndEmpty('$transporterNames'),
        transporterEmails: $filterNullAndEmpty('$transporterEmails'),
        transporterCellphones: $filterNullAndEmpty('$transporterCellphones'),
        shipNames: $filterNullAndEmpty('$shipNames'),
        shipRegNumbers: $filterNullAndEmpty('$shipRegNumbers'),
        loadManagerEmails: $filterNullAndEmpty('$loadManagerEmails'),
        unloadManagerEmails: $filterNullAndEmpty('$unloadManagerEmails')
      }
    }
  ])
    .then(result => {
      const contacts = result[0];
      if (!contacts) {
        return;
      }
      // sort values for each key
      Object.values(contacts).forEach(arr => {
        if (Array.isArray(arr)) {
          arr.sort();
        }
      });
      return contacts;
    });
};

export { get, put, findByEmail, findContacts, getAll };
