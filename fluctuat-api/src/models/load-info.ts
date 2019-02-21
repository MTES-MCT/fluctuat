import { LoadManager } from './load-manager';

export class LoadInfo {

  origin: string;
  destination: string;
  arrivalDate: string;
  merchandiseType: string;
  merchandiseWeight: string;
  merchandisePrice: string;
  startDate: string;
  loadEndDate: string;
  comments: string;
  loadManager: LoadManager = new LoadManager();

  sentAt: Date;
  validatedAt: Date;
}
