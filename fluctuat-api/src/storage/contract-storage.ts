import { checkDataDir, checkDataFile, getData, putData } from './storage-utils';

const path = require('path');


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

export { count, get, getAll, patch, put };
