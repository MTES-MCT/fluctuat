const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));

const auth = require('./routes/auth.route');
app.use('/api/auth', auth);

const waybill = require('./routes/waybill.route');
app.use('/api/waybill', waybill);

const notify = require('./routes/notify.route');
app.use('/api/notify', notify);

/** Start server **/
const port = process.argv[2] || 9000;

app.listen(port, function () {
  console.log('Express server listening in http://localhost:%d', port);
});
