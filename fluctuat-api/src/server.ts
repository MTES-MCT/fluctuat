const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(logger('dev'));

const contract = require('./routes/contract.route');
app.use('/api/contract', contract);

const transporter = require('./routes/transporter.route');
app.use('/api/transporter', transporter);

/** Start server **/
const port = process.argv[2] || 9000;

app.listen(port, function () {
  console.log('Express server listening in http://localhost:%d', port);
});
