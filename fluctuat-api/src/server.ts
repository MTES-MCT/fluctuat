import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';

import { authRoute } from './routes/auth.route';
import { contactsRoute } from './routes/contacts.route';
import { notifyRoute } from './routes/notify.route';
import { statsRoute } from './routes/stats.route';
import { waybillLoadValidationRoute } from './routes/waybill-load-validation.route';
import { waybillUnloadValidationRoute } from './routes/waybill-unload-validation.route';
import { waybillRoute } from './routes/waybill.route';
import { mongoClient } from './storage/mongo-client';

const app = express();

const main = async () => {

  await mongoClient();

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(logger(':remote-addr - :method :url :status :response-time ms - :res[content-length]'));
  app.set('trust proxy', 'loopback');

  app.use('/api/auth', authRoute);
  app.use('/api/waybill', waybillRoute);
  app.use('/api/load-validation', waybillLoadValidationRoute);
  app.use('/api/unload-validation', waybillUnloadValidationRoute);
  app.use('/api/notify', notifyRoute);
  app.use('/api/contacts', contactsRoute);
  app.use('/api/stats', statsRoute);

  /* Start server **/
  const port = process.argv[2] || 9000;

  app.listen(port, () => {
    console.log('Express server listening in http://localhost:%d', port);
  });
};

main().catch(error => {
  console.log('server fails to start', error.message);
  process.exit(1);
});
