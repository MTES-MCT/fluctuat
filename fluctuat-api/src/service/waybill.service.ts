import * as randomstring from 'randomstring';
import * as waybillStorage from '../storage/waybill-storage';
import { Waybill } from '../models/waybill';
import { LoadInfo } from '../models/load-info';

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

const createWaybill = async (waybill: Waybill, owner: string) => {

  waybill.code = await generateCode();
  waybill.owner = owner;

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

export { createWaybill, saveLoadInfo, saveUnloadInfo };
