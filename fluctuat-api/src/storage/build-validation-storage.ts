import { Document, model, Model } from 'mongoose';
import { LoadValidation } from '../models/load-validation';
import { ValidationSchema } from './schemas/validation.schema';
import { ValidationStorage } from './validation.storage';

interface ValidationDocument extends LoadValidation, Document {
}

const buildValidationStorage = (collectionName): ValidationStorage => {
  const ValidationDao: Model<ValidationDocument> = model<ValidationDocument>(collectionName, ValidationSchema);

  const get = (code) => ValidationDao.findOne({ code }).exec();

  const getByWaybillId = (waybillId: string) => ValidationDao.findOne({ waybillId }).exec();

  const put = (loadValidation: LoadValidation) => new ValidationDao(loadValidation).save();

  return { get, getByWaybillId, put };
};

export { buildValidationStorage };
