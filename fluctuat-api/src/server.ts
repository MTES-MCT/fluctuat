import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';

import { mongoClient } from './storage/mongo-client';

const app = express();

const main = async () => {

  await mongoClient();

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(logger(':remote-addr - :method :url :status :response-time ms - :res[content-length]'));
  app.set('trust proxy', 'loopback');

  const auth = require('./routes/auth.route');
  app.use('/api/auth', auth);

  const waybill = require('./routes/waybill.route');
  app.use('/api/waybill', waybill);

  const notify = require('./routes/notify.route');
  app.use('/api/notify', notify);

  const contacts = require('./routes/contacts.route');
  app.use('/api/contacts', contacts);

  /* Start server **/
  const port = process.argv[2] || 9000;

  app.listen(port, () => {
    console.log('Express server listening in http://localhost:%d', port);
  });
};

main().catch(error => {
  console.error('server fails to start', error);
});
