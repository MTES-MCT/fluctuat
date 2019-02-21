import { LoadManager } from './load-manager';

export class UnloadInfo {

  startDate: string;
  endDate: string;
  merchandiseWeight: string;
  comments: string;
  loadManager: LoadManager = new LoadManager();

  sentAt: Date;
  validatedAt: Date;
}
