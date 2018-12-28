const fs = require('fs');
const path = require('path');

const checkDataDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, 0o755);
    console.log('Create data directory', dir);
  } else {
    console.log('Data directory OK', dir);
  }
};

checkDataDir('.data');
const contractsFile = path.join('.data', 'contracts.json');

const checkContractsFile = () => {
  if (!fs.existsSync(contractsFile)) {
    fs.writeFileSync(contractsFile, '[]', 'utf-8');
    console.log('Create contracts file');
  }
};

checkContractsFile();

const getContracts = () => JSON.parse(fs.readFileSync(contractsFile));
const putContracts = (contracts) => fs.writeFileSync(contractsFile, JSON.stringify(contracts, null, 2));

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
