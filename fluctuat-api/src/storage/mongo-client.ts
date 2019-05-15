import { connect } from 'mongoose';
import { config } from '../service/config.service';

const mongoClient = () => {
  console.log(`Connecting to mongo db ${config.DB_NAME}...`);
  const uri = `${`mongodb${config.DB_IS_DNS === 'true' ? '+srv' : ''}://${config.DB_CLUSTER}/?retryWrites=true`}`;
  return connect(uri,
    {
      useNewUrlParser: true,
      user: config.DB_USER,
      pass: config.DB_PASSWORD,
      dbName: config.DB_NAME
    })
    .then(() => console.log('MongoDB connected!'));
};

export { mongoClient };
