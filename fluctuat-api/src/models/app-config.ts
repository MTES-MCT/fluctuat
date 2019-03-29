export class AppConfig {
  debug = true;

  email = {
    user: '',
    pass: '',
    sender: {
      name: '',
      email: ''
    }
  };

  sms = {
    token: ''
  };

  mongodb = {
    user: '',
    password: '',
    dbName: '',
    cluster: ''
  };

  jwtSecret = '';
  host = '';
  secure = false
}

