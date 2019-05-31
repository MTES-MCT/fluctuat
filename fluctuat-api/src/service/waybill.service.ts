import * as randomstring from 'randomstring';
import { LoadInfo } from '../models/load-info';
import { OrderInfo } from '../models/order-info';
import { Waybill } from '../models/waybill';
import * as waybillStorage from '../storage/waybill-storage';

const generateCode = async () => {

  const code = randomstring.generate({
    length: 6,
    readable: true,
    capitalization: 'uppercase'
  });
  // if code exist retry;
  const waybill = await waybillStorage.get(code);
  return waybill ? generateCode() : code;
};

const createWaybill = async (orderInfo: OrderInfo, owner: string) => {
  const waybill = new Waybill();
  waybill.code = await generateCode();
  waybill.owner = owner;
  waybill.orderInfo = Object.assign(waybill.orderInfo, orderInfo);
  waybill.orderInfo.sentAt = new Date();

  return await waybillStorage.put(waybill);
};

const saveOrderInfo = async (waybill: Waybill, orderInfo: OrderInfo) => {
  waybill.orderInfo = orderInfo;
  waybill.orderInfo.sentAt = new Date();

  return await waybillStorage.put(waybill);
};

const saveLoadInfo = async (waybill: Waybill, loadInfo: LoadInfo) => {
  waybill.loadInfo = loadInfo;
  waybill.loadInfo.sentAt = new Date();

  return await waybillStorage.put(waybill);
};

const saveUnloadInfo = async (waybill: Waybill, unloadInfo: LoadInfo) => {
  waybill.unloadInfo = unloadInfo;
  waybill.unloadInfo.sentAt = new Date();

  return await waybillStorage.put(waybill);
};

export { createWaybill, saveOrderInfo, saveLoadInfo, saveUnloadInfo };
