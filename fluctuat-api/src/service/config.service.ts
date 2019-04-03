import { AppConfig } from '../models/app-config';

// tslint:disable-next-line
const config: AppConfig = require('../../.data/config.json');

export const getConfig = (): AppConfig => config;

export const getBaseUrl = (): string => config.secure ? `https://${config.host}` : `http://${config.host}`;