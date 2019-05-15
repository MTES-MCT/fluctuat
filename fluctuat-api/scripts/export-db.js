#!/usr/bin/env node
/**
 * Export all collections to ./data directory.
 *
 * usage:  ./export-db.js [ENV]
 *
 * ENV: (optional) env name if not specified default env is used
 *
 * Script requires mongoexport are installed
 */
const {execSync} = require('child_process');
const path = require('path');
let env = process.argv[2];
const ENV_FILE_PATH = env ? path.join(__dirname, `../.env.${env}`) : path.join(__dirname, '../.env');
const loadConfig = require('dotenv').config(({path: ENV_FILE_PATH}));

if (loadConfig.error) {
  throw loadConfig.error
}
const config = loadConfig.parsed;

let protocol = config.DB_IS_DNS === 'true' ? 'mongodb+srv://' : 'mongodb://';
let uri = `${protocol}${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_CLUSTER}/${config.DB_NAME}`;
const timestamp = new Date().toISOString().replace(/[:|.]/g, '_');
const outDir = path.join(__dirname, '../.data', config.DB_NAME, timestamp);
console.log(`exporting ${config.DB_NAME} db...`)

execSync(`mongoexport --uri ${uri} --collection users --jsonArray --pretty --out ${outDir}/users.json`);
execSync(`mongoexport --uri ${uri} --collection waybills --jsonArray --pretty --out  ${outDir}/waybills.json`);
execSync(`mongoexport --uri ${uri} --collection loadvalidations --jsonArray --pretty --out ${outDir}/loadvalidations.json`);
execSync(`mongoexport --uri ${uri} --collection unloadvalidations --jsonArray --pretty --out ${outDir}/unloadvalidations.json`);
