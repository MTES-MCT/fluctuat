const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const contract = require('./routes/contract.route');

app.use('/', express.static(__dirname));
app.use(bodyParser.json());

app.use('/api/contract', contract);

/** Start server **/
const port = process.argv[ 2 ] || 9000;

app.listen(port, function () {
  console.log('Express server listening in http://localhost:%d', port);
});
