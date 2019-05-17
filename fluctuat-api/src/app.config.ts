export class AppConfig {
  /** if true emails and sms are not sent */
  static readonly DEBUG = process.env.DEBUG === 'true';

  /** email account form the emails are sent */
  static readonly EMAIL_USER: string = process.env.EMAIL_USER;
  /** name of the email account */
  static readonly EMAIL_NAME: string = process.env.EMAIL_NAME;
  static readonly EMAIL_API_KEY: string = process.env.EMAIL_API_KEY;
  static readonly EMAIL_API_PASSWORD: string = process.env.EMAIL_API_PASSWORD;

  /** sms auth token */
  static readonly SMS_API_TOKEN: string = process.env.SMS_API_TOKEN;
  static readonly DB_USER: string = process.env.DB_USER;
  static readonly DB_PASSWORD: string = process.env.DB_PASSWORD;
  /** the name of the db */
  static readonly DB_NAME: string = process.env.DB_NAME;
  /** cluster hostname */
  static readonly DB_CLUSTER: string = process.env.DB_CLUSTER;
  /** should be true if the cluster is a DNS seed list ex: db.mydomain.example */
  static readonly DB_IS_DNS = process.env.DB_IS_DNS === 'true';

  /** jwt signature */
  static readonly JWT_SECRET: string = process.env.JWT_SECRET;

  /** hostname where app turn on */
  static readonly HOST: string = process.env.HOST;

  /** true if the environment is secure (a valid ssl certificate) */
  static readonly SECURE = process.env.SECURE === 'true';

  static readonly getBaseUrl = () => AppConfig.SECURE ? `https://${AppConfig.HOST}` : `http://${AppConfig.HOST}`;

}
