#!/usr/bin/env node

/*
Check config files are ok or create them with default values
*/

const fs = require('fs');
const path = require('path')

const checkDirExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, 0o755);
    console.log('Create directory', dir);
  } else {
    console.log('Check directory OK', dir);
  }
};

const checkFileExists = (file, initValue) => {
  if (!fs.existsSync(file)) {
    console.log('Init config file', file)
    fs.writeFileSync(file, initValue, 'utf-8');
  } else {
    console.log('Check file OK', file)
  }
};

const DATA_DIR_PATH = path.join(__dirname, '../.data');
checkDirExists(DATA_DIR_PATH);

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

checkFileExists(DATA_DIR_PATH + '/config.json', initValue);
