import { Waybill } from '../models/waybill';
import { Document, model, Model } from 'mongoose';
import { WaybillSchema } from './schemas/waybill.schema';

interface WaybillDocument extends Waybill, Document {
}

const WaybillDao: Model<WaybillDocument> = model<WaybillDocument>('Waybill', WaybillSchema);

const get = (code) => WaybillDao.findOne({ code });

const put = (waybill: Waybill) => new WaybillDao(waybill).save();

const findByEmail = (owner: string) => WaybillDao.find({ owner });

export { get, put, findByEmail }
