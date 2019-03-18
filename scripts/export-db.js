const { execSync } = require('child_process');
const configMongo = require('../fluctuat-api/.data/config.json').mongodb;

const uri = `mongodb+srv://${configMongo.user}:${configMongo.password}@${configMongo.cluster}/${configMongo.dbName}`;

execSync(`mongoexport --uri ${uri} --collection waybills --jsonArray --pretty --out ../fluctuat-api/.data/waybills.json`);
execSync(`mongoexport --uri ${uri} --collection users --jsonArray --pretty --out ../fluctuat-api/.data/users.json`);
