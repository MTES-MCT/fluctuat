#!/usr/bin/env node
/**
 * Import data collections from a source directory'
 *
 * usage:  ./import-db.js [SOURCE_DIR]
 *
 * SOURCE_DIR: path to exported collections
 *
 * Script requires mongoimport are installed
 */
const {execSync} = require('child_process');
const path = require('path');

const configPath = path.join(__dirname, '../.data/config.json')
const configMongo = require(configPath).mongodb;

let source = process.argv[2];
if (!source) {
  console.error('Missing source directory. Usage: node import-db.js [SOURCE_DIR]')
  process.exit(1)
}

let protocol = configMongo.isDns ? 'mongodb+srv://' : 'mongodb://';
const uri = `${protocol}${configMongo.user}:${configMongo.password}@${configMongo.cluster}/${configMongo.dbName}`;
// upsert replaces existing documents in the database with matching documents from the import file

execSync(`mongoimport --uri ${uri} --collection waybills --mode upsert --jsonArray --file ${source}/waybills.json`);
execSync(`mongoimport --uri ${uri} --collection users  --mode upsert --jsonArray --file ${source}/users.json`);
execSync(`mongoimport --uri ${uri} --collection loadvalidations  --mode upsert --jsonArray --file ${source}/loadvalidations.json`);
execSync(`mongoimport --uri ${uri} --collection unloadvalidations  --mode upsert --jsonArray --file ${source}/unloadvalidations.json`);
