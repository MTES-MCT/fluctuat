import { checkDataDir, checkDataFile, getData, putData } from './storage-utils';
import { Waybill } from '../models/waybill';

const path = require('path');

checkDataDir('.data');
const waybillData = path.join('.data', 'waybill.json');
checkDataFile(waybillData, '{}');

const getWaybills = getData(waybillData);
const putWaybills = putData(waybillData);

const get = (id) => getWaybills()[id];

const put = (wayBill: Waybill) => {
  let waybills = getWaybills();
  waybills[wayBill.id] = wayBill;
  putWaybills(waybills);
};

export { get, put }
