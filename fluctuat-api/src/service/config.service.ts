import * as dotenv from 'dotenv';

import { AppConfig } from '../models/app-config';

const loadConfig = dotenv.config();
if (loadConfig.error) {
  // TODO maybe warning
  throw loadConfig.error;
}

const config: AppConfig = loadConfig.parsed;

const getBaseUrl = (): string => config.SECURE === 'true' ? `https://${config.HOST}` : `http://${config.HOST}`;

export { config, getBaseUrl };
