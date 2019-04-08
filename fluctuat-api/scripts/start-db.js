#!/usr/bin/env node
const {execSync} = require('child_process');
const path = require('path')
const DATA_DIR_PATH = path.join(__dirname, '../.data');

execSync(`docker container run --rm -p 27017:27017 -v ${DATA_DIR_PATH}/fluctuat-db:/data/db/ mongo:4.0`, {stdio:'inherit'});
