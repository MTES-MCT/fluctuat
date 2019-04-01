import { connect } from 'mongoose';
import { getConfig } from '../service/config.service';

const configMongo = getConfig().mongodb;

const mongoClient = () => {
  console.log('Connecting to DB...');
  console.log(`Using db name ${configMongo.dbName}`);
  return connect(`mongodb+srv://${configMongo.cluster}/?retryWrites=true`,
    {
      useNewUrlParser: true,
      user: configMongo.user,
      pass: configMongo.password,
      dbName: configMongo.dbName
    })
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));
};

export { mongoClient };
