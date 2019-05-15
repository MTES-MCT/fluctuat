export interface AppConfig {
  /** if true emails and sms are not sent */
  DEBUG: string;

  /** email account form the emails are sent */
  EMAIL_USER: string;
  /** name of the email account */
  EMAIL_NAME: string;
  EMAIL_API_KEY: string;
  EMAIL_API_PASSWORD: string;

  /** sms auth token */
  SMS_API_TOKEN: string;

  DB_USER: string;
  DB_PASSWORD: string;
  /** the name of the db */
  DB_NAME: string;
  /** cluster hostname */
  DB_CLUSTER: string;
  /** should be true if the cluster is a DNS seed list ex: db.mydomain.example */
  DB_IS_DNS: string;

  /** jwt signature */
  JWT_SECRET: string;

  /** hostname where app turn on */
  HOST: string;

  /** true if the environment is secure (a valid ssl certificate) */
  SECURE: string;
}
