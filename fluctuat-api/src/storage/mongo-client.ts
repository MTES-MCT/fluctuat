import { connect } from 'mongoose';

const mongoClient = (configMongo) => {
  console.log(`Connecting to mongo db ${configMongo.dbName}...`);
  const uri = `${`mongodb${configMongo.isDns ? '+srv' : ''}://${configMongo.cluster}/?retryWrites=true`}`;
  return connect(uri,
    {
      useNewUrlParser: true,
      user: configMongo.user,
      pass: configMongo.password,
      dbName: configMongo.dbName
    })
    .then(() => console.log('MongoDB connected!'));
};

export { mongoClient };
