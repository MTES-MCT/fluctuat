const { execSync } = require('child_process');
const configMongo = require('../.data/config.json').mongodb;

const uri = `mongodb+srv://${configMongo.user}:${configMongo.password}@${configMongo.cluster}/${configMongo.dbName}`;

// upsert replaces existing documents in the database with matching documents from the import file

execSync(`mongoimport --uri ${uri} --collection waybills --mode upsert --jsonArray --file ../.data/waybills.json`);
execSync(`mongoimport --uri ${uri} --collection users  --mode upsert --jsonArray --file ../.data/users.json`);
