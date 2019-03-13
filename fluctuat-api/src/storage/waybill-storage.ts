import { Waybill } from '../models/waybill';
import { Document, model, Model } from 'mongoose';
import { WaybillSchema } from './schemas/waybill.schema';

interface WaybillDocument extends Waybill, Document {
}

const WaybillDao: Model<WaybillDocument> = model<WaybillDocument>('Waybill', WaybillSchema);

const get = (code) => WaybillDao.findOne({ code });

const put = (waybill: Waybill) => new WaybillDao(waybill).save();

const findByEmail = (email: string) => {
  return WaybillDao.find({
    $or: [
      { owner: email },
      { 'order.customer.email': email},
      { 'order.sender.email': email},
      { 'order.receiver.email': email},
      { 'order.transporter.email': email},
      { 'order.originInfo.email': email},
      { 'order.destinationInfo.email': email},
    ]
  });
};

const findContacts = (owner: string) => {
  const $filterNullAndEmpty = (field) => {
    return {
      $filter: {
        input: field,
        as: 'item',
        cond: { $and: [{ $ne: ['$$item', null] }, { $ne: ['$$item', ''] }] }
      }
    }
  };

  return WaybillDao.aggregate([
    { $match: { owner: owner } },
    {
      $group: {
        _id: '$owner',
        customerNames: { $addToSet: '$order.customer.name' },
        customerEmails: { $addToSet: '$order.customer.email' },
        senderNames: { $addToSet: '$order.sender.name' },
        senderEmails: { $addToSet: '$order.sender.email' },
        receiverNames: { $addToSet: '$order.receiver.name' },
        receiverEmails: { $addToSet: '$order.receiver.email' },
        middlemanNames: { $addToSet: '$order.middleman.name'},
        middlemanEmails: { $addToSet: '$order.middleman.email'},
        transporterNames: { $addToSet: '$order.transporter.name' },
        transporterEmails: { $addToSet: '$order.transporter.email' },
        transporterCellphones: { $addToSet: '$order.transporter.cellphone' },
        shipNames: { $addToSet: '$order.ship.name' },
        shipRegNumbers: { $addToSet: '$order.ship.regNumber' },
        loadManagerEmails: { $addToSet: '$order.originInfo.email' },
        unloadManagerEmails: { $addToSet: '$order.destinationInfo.email' }
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
      let contacts = result[0];
      if (!contacts) {
        return;
      }
      // sort values for each key
      Object.values(contacts).forEach(arr => {
        if (Array.isArray(arr)) {
          arr.sort()
        }
      });
      return contacts;
    })
};

export { get, put, findByEmail, findContacts }
