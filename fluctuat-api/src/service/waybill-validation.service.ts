import { Waybill } from '../models/waybill';
import * as waybillStorage from '../storage/waybill-storage';
import { sendWaybill, sendWaybillLoaded } from './send-waybill.service';

const validateLoadInfo = async (waybill: Waybill) => {
  const loadInfo = waybill.loadInfo;

  // if already validated return loadInfo
  if (loadInfo.validatedAt) {
    return loadInfo;
  }

  // add the link to pdf document
  waybill.documentUrl = `/api/waybill/${waybill.code}/lettre-de-voiture.pdf`;

  loadInfo.validatedAt = new Date();
  await waybillStorage.put(waybill);

  sendWaybillLoaded(waybill)
    .then(() => console.log('waybill loaded email sent'))
    .catch(console.error);

  return loadInfo;
};

const validateUnloadInfo = async (waybill: Waybill) => {
  const unloadInfo = waybill.unloadInfo;

  // if already validated return unloadInfo
  if (unloadInfo.validatedAt) {
    return unloadInfo;
  }

  unloadInfo.validatedAt = new Date();
  await waybillStorage.put(waybill);

  // send waybill by email
  sendWaybill(waybill)
    .then(() => console.log('waybill sent'))
    .catch(console.error);

};

export { validateLoadInfo, validateUnloadInfo };
