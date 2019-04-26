import { LoadValidation } from '../models/load-validation';

export interface ValidationStorage {

  get(code: string): Promise<LoadValidation>;

  getByWaybillId(waybillId: string): Promise<LoadValidation>;

  put(loadValidation: LoadValidation): Promise<LoadValidation>;
}
