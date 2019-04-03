#!/usr/bin/env node

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
    'user': 'ask for an user',
    'pass': 'ask for a password',
    'sender': {
      'name': 'Fluctuat Info',
      'email': 'contact@fluctuat.beta.gouv.fr'
    }
  },
  'sms': {
    'token': 'ask for a token'
  },
  'mongodb': {
    'user': '',
    'password': '',
    'dbName': 'fluctuat-dev',
    'cluster': 'localhost:27017',
    'isDns': false
  },
  'jwtSecret': 'ch4ngeMe!!!!',
  'host': 'localhost:4200',
  'secure': false
}, null, 2);

checkDataFile('./.data/config.json', initValue);
