import { connect } from 'mongoose';

const configMongo = require('../../.data/config.json').mongodb;

console.log('Connecting to DB...');
connect(`mongodb+srv://${configMongo.cluster}/?retryWrites=true`,
  {
    useNewUrlParser: true,
    user: configMongo.user,
    pass: configMongo.password,
    dbName: configMongo.dbName
  })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));
