export class AppConfig {
  /** if true emails and sms are not sent */
  debug = true;

  email = {
    /** username of the email service */
    user: '',
    pass: '',
    /** email account form the emails are sent */
    sender: {
      name: '',
      email: ''
    }
  };

  sms = {
    /** auth token */
    token: ''
  };

  mongodb = {
    user: '',
    password: '',
    /** the name of the db */
    dbName: '',
    /** cluster hostname */
    cluster: '',
    /** should be true if the cluster is a DNS seed list ex: db.fluctuat.fr */
    isDns: false
  };

  /** signature of emited jwt */
  jwtSecret = '';
  /** hostname where app turn on */
  host = '';
  /** the environment is secure (ssl) */
  secure = false;
}
