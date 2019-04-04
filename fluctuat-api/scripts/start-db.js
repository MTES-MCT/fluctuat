#!/usr/bin/env node
const { execSync } = require('child_process');

execSync(`docker-compose -f ${__dirname}/mongodb.yml up -d`);
