#!/usr/bin/env node
/**
 * Import data collections from a source directory'
 *
 * usage:  ./import-db.js SOURCE_DIR [ENV]
 *
 * SOURCE_DIR: path to exported collections
 * ENV: (optional) env name if not specified default env is used
 *
 * Script requires mongoimport are installed
 */
const {execSync} = require('child_process');
const path = require('path');
let env = process.argv[3];
const ENV_FILE_PATH = env ? path.join(__dirname, `../.env.${env}`) : path.join(__dirname, '../.env');
const loadConfig = require('dotenv').config(({path: ENV_FILE_PATH}));

if (loadConfig.error) {
  throw loadConfig.error
}
const config = loadConfig.parsed;

let source = process.argv[2];
if (!source) {
  console.error('Missing source directory. Usage: node import-db.js [SOURCE_DIR]')
  process.exit(1)
}

let protocol = config.DB_IS_DNS === 'true' ? 'mongodb+srv://' : 'mongodb://';
const uri = `${protocol}${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_CLUSTER}/${config.DB_NAME}`;

console.log(`importing to ${config.DB_NAME} db...`)

// upsert replaces existing documents in the database with matching documents from the import file
execSync(`mongoimport --uri ${uri} --collection waybills --mode upsert --jsonArray --file ${source}/waybills.json`);
execSync(`mongoimport --uri ${uri} --collection users  --mode upsert --jsonArray --file ${source}/users.json`);
execSync(`mongoimport --uri ${uri} --collection loadvalidations  --mode upsert --jsonArray --file ${source}/loadvalidations.json`);
execSync(`mongoimport --uri ${uri} --collection unloadvalidations  --mode upsert --jsonArray --file ${source}/unloadvalidations.json`);
