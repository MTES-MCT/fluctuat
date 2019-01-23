export class LoadInfo {

  origin: string;
  destination: string;
  arrivalDate: Date;
  merchandiseType: string;
  merchandiseWeight: string;
  merchandisePrice: string;
  loadStartDate: Date;
  loadEndDate: Date;
  comments: string;
  loadManager: {
    name?: string,
    jobFunction?: string
  } = {};
}
