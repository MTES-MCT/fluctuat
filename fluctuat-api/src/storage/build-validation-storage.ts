import { Document, model, Model } from 'mongoose';
import { LoadValidation } from '../models/load-validation';
import { ValidationSchema } from './schemas/validation.schema';

interface ValidationDocument extends LoadValidation, Document {
}

const buildValidationStorage = (collectionName) => {
  const ValidationDao: Model<ValidationDocument> = model<ValidationDocument>(collectionName, ValidationSchema);

  const get = (code) => ValidationDao.findOne({ code });

  const getByWaybillId = (waybillId) => ValidationDao.findOne({ waybillId });

  const put = (loadValidation: LoadValidation) => new ValidationDao(loadValidation).save();

  return { get, put, getByWaybillId };
};

export { buildValidationStorage };
