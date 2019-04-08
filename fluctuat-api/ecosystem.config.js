// pm2 ecosystem config file
// see https://pm2.io/doc/en/runtime/guide/ecosystem-file
//

const fullDate = 'YYYY-MM-DD HH:mm:ss';

module.exports = {
  apps: [
    {
      name: 'fluctuat-api',
      script: 'dist/server.js',
      log_date_format: fullDate,
      restart_delay: 1000,
      max_restarts: 10,
      min_uptime: 3000
    }
  ]
}
