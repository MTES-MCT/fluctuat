const fs = require('fs');

const checkDataDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, 0o755);
    console.log('Create data directory', dir);
  } else {
    console.log('Data directory OK', dir);
  }
};

const checkDataFile = (file, initValue) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, initValue, 'utf-8');
  }
};

const getData = (file) => () => JSON.parse(fs.readFileSync(file));

const putData = (file) => (data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

export { getData, checkDataDir, putData, checkDataFile };
