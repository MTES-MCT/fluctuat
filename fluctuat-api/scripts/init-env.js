#!/usr/bin/env node

/*
 This script check env file or create it from template with default values.
*/
const fs = require('fs');
const path = require('path')

const ENV_FILE_PATH = path.join(__dirname, '../.env');

if (!fs.existsSync(ENV_FILE_PATH)) {
  const ENV_TEMPLATE_PATH = path.join(__dirname, '../.env-template');
  fs.copyFileSync(ENV_TEMPLATE_PATH, ENV_FILE_PATH)
  console.log('.env file created with default values, please setup missing values')
} else {
  console.log('Check .env file OK')
}
