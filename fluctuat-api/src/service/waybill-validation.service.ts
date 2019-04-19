import * as randomstring from 'randomstring';

import { LoadValidation } from '../models/load-validation';
import { Waybill } from '../models/waybill';
import * as loadValidationStorage from '../storage/load-validation.storage';
import * as unloadValidationStorage from '../storage/unload-validation.storage';
import * as waybillStorage from '../storage/waybill-storage';
import { getBaseUrl } from './config.service';
import {
  sendWaybill,
  sendWaybillLoaded,
  sendWaybillLoadValidation,
  sendWaybillUnloadValidation
} from './send-waybill.service';

const baseUrl = getBaseUrl();

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

  return unloadInfo;
};

const sendLoadValidation = async (waybill: Waybill) => {
  const loadValidation = await loadValidationStorage.getByWaybillId(waybill.code) || generateValidation(waybill);

  await loadValidationStorage.put(loadValidation);
  const confirmationLink = `${baseUrl}/confirmation-chargement/${loadValidation.code}`;

  // send load validation email
  sendWaybillLoadValidation(waybill, confirmationLink)
    .then(() => console.log('load validation sent'))
    .catch(console.error);
};

const sendUnLoadValidation = async (waybill: Waybill) => {
  const unloadValidation = await unloadValidationStorage.getByWaybillId(waybill.code) || generateValidation(waybill);

  await unloadValidationStorage.put(unloadValidation);
  const confirmationLink = `${baseUrl}/confirmation-dechargement/${unloadValidation.code}`;

  // send validation email
  sendWaybillUnloadValidation(waybill, confirmationLink)
    .then(() => console.log('unload validation sent'))
    .catch(console.error);
};

const generateValidation = (waybill: Waybill): LoadValidation => {
  const validationCode = randomstring.generate({
    length: 10,
    readable: true
  });
  return {
    code: validationCode,
    waybillId: waybill.code
  };
};

export { validateLoadInfo, validateUnloadInfo, sendLoadValidation, sendUnLoadValidation };
