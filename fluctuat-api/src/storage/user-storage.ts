import { checkDataDir, checkDataFile, getData, putData } from './storage-utils';
import { User } from '../models/user';

const path = require('path');

checkDataDir('.data');
const usersData = path.join('.data', 'users.json');
checkDataFile(usersData, '{}');

const getUsers = getData(usersData);
const putUsers = putData(usersData);

const get = (id) => getUsers()[id];

const put = (user: User) => {
  let users = getUsers();
  users[user.email] = user;
  putUsers(users);
};

export { get, put }
