// pm2 ecosystem config file
// see https://pm2.io/doc/en/runtime/guide/ecosystem-file
//

const fullDate = 'YYYY-MM-DD HH:mm:ss';

module.exports = {
  apps: [
    {
      name: 'fluctuat-api',
      script: 'dist/server.js',
      log_date_format: fullDate
    }
  ]
};
