import { connect } from 'mongoose';
import { AppConfig } from '../app.config';

const mongoClient = () => {
  console.log(`Connecting to mongo db ${AppConfig.DB_NAME}...`);
  const uri = `${`mongodb${AppConfig.DB_IS_DNS ? '+srv' : ''}://${AppConfig.DB_CLUSTER}/?retryWrites=true`}`;
  return connect(uri,
    {
      useNewUrlParser: true,
      user: AppConfig.DB_USER,
      pass: AppConfig.DB_PASSWORD,
      dbName: AppConfig.DB_NAME
    })
    .then(() => console.log('MongoDB connected!'));
};

export { mongoClient };
