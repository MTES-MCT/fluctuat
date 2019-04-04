import { connect } from 'mongoose';
import { getConfig } from '../service/config.service';

const configMongo = getConfig().mongodb;

const mongoClient = () => {
  console.log(`Connecting to mongo db ${configMongo.dbName}...`);
  const uri = `${`mongodb${configMongo.isDns ? '+srv' : ''}://${configMongo.cluster}/?retryWrites=true`}`;
  return connect(uri,
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
