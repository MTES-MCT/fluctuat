export class LoadInfo {

  origin: string;
  destination: string;
  arrivalDate: string;
  merchandiseType: string;
  merchandiseWeight: string;
  merchandisePrice: string;
  loadStartDate: string;
  loadEndDate: string;
  comments: string;
  loadManager: {
    name?: string,
    jobFunction?: string
  } = {};
}
