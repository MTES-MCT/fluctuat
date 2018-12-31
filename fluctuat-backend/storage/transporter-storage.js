const path = require('path');
const {checkDataDir, checkDataFile, getData, putData} = require('./storage-utils');

// DEMO data
const transporterDemo = `{
  "address": {
    "street": "10 rue de la Seine",
    "zipCode": "76100",
    "city": "Rouen"
  },
  "ship": {
    "name": "AIGUE MARINE",
    "regNumber": "FR 1234 Y",
    "captain": "Capitain Nemo"
  },
  "name": "Les Bateliers du Nord",
  "phone": "02 01 20 20 20",
  "email": "info@lesbateliers.fr"
}`;

checkDataDir('.data');
const transporterData = path.join('.data', 'transporters.json');
checkDataFile(transporterData, `[${transporterDemo}]`);
const getTransporters = getData(transporterData);
const putTransporters = putData(transporterData);

const get = (id) => getTransporters()[id];

const patch = (id, values) => {
  let contracts = getTransporters();
  let contract = contracts[id];
  Object.assign(contract, values);
  putTransporters(contracts);
};

module.exports = {
  get: get,
  patch: patch
};
