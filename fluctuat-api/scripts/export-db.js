#!/usr/bin/env node
/**
 * Export all collections to ./data directory.
 * Script requires mongoexport are installed
 */
const {execSync} = require('child_process');
const path = require('path');

const configPath = path.join(__dirname, '../.data/config.json')
const configMongo = require(configPath).mongodb;

let protocol = configMongo.isDns ? 'mongodb+srv://' : 'mongodb://';
let uri = `${protocol}${configMongo.user}:${configMongo.password}@${configMongo.cluster}/${configMongo.dbName}`;
const timestamp = new Date().getTime().toString()
const outDir = path.join(__dirname, '../.data', configMongo.dbName, timestamp);

execSync(`mongoexport --uri ${uri} --collection users --jsonArray --pretty --out ${outDir}/users.json`);
execSync(`mongoexport --uri ${uri} --collection waybills --jsonArray --pretty --out  ${outDir}/waybills.json`);
execSync(`mongoexport --uri ${uri} --collection loadvalidations --jsonArray --pretty --out ${outDir}/loadvalidations.json`);
execSync(`mongoexport --uri ${uri} --collection unloadvalidations --jsonArray --pretty --out ${outDir}/unloadvalidations.json`);
