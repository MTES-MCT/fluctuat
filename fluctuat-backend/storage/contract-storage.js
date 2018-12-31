const path = require('path');
const {checkDataDir, checkDataFile, getData, putData} = require('./storage-utils');

checkDataDir('.data');
const contractsData = path.join('.data', 'contracts.json');
checkDataFile(contractsData, '[]');

const getContracts = getData(contractsData);
const putContracts = putData(contractsData);

const count = () => getContracts().length;

const get = (id) => getContracts()[id];

const getAll = () => getContracts();

const patch = (id, values) => {
  let contracts = getContracts();
  let contract = contracts[id];
  Object.assign(contract, values);
  putContracts(contracts);
};

const put = (contract) => {
  let contracts = getContracts();
  contracts.push(contract);
  putContracts(contracts);
};

module.exports = {
  count: count,
  get: get,
  getAll: getAll,
  patch: patch,
  put: put
};
