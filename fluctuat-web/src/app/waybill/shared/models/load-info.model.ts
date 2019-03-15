import { LoadManager } from './load-manager';

export class LoadInfo {

  startDate: string;
  endDate: string;
  merchandiseWeight: string;
  comments: string;
  loadManager: LoadManager = new LoadManager();

  sentAt: Date;
  validatedAt: Date;
}
