import { LoadManager } from './load-manager';

export class UnloadInfo {

  unloadStartDate: string;
  unloadEndDate: string;
  merchandiseWeight: string;
  comments: string;
  unloadManager: LoadManager = new LoadManager()
}
