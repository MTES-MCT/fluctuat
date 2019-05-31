import { LoadManager } from './load-manager.model';

export class LoadInfo {

  startDate: Date;
  endDate: Date;
  merchandiseWeight: string;
  comments: string;
  loadManager: LoadManager = new LoadManager();

  sentAt: Date;
  validatedAt: Date;
}
