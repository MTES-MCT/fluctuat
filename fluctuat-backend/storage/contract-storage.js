let contracts = [];

const put = (contract) => {
  contracts.push(contract);
};

const getAll = () => contracts;

const count = () => contracts.length;

const get = (id) => contracts[id];

const patch = (id, values) => {
  let contract = contracts[id];
  Object.assign(contract, values);
};

module.exports = {
  patch: patch,
  put: put,
  count: count,
  getAll: getAll,
  get: get
};
