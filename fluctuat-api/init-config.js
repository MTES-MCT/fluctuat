const fs = require('fs');

const checkDataDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, 0o755);
    console.log('Create data directory', dir);
  } else {
    console.log('Data directory OK', dir);
  }
};

const checkDataFile = (file, initValue) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, initValue, 'utf-8');
  }
};

checkDataDir('./.data');

const initValue = JSON.stringify({
  'debug': true,
  'email': {
    'user': '',
    'pass': ''
  },
  'sms': {
    'token': ''
  },
  'mongodb': {
    'user': '',
    'password': '',
    'dbName': '',
    'cluster': ''
  },
  'jwtSecret': '',
  'host': ''
}, null, 2);

checkDataFile('./.data/config.json', initValue);
