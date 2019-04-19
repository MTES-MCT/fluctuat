import { Document, model, Model } from 'mongoose';
import { LoadValidation } from '../models/load-validation';
import { ValidationSchema } from './schemas/validation.schema';

interface ValidationDocument extends LoadValidation, Document {
}

const buildValidationStorage = (collectionName) => {
  const UnloadValidationDao: Model<ValidationDocument> = model<ValidationDocument>(collectionName, ValidationSchema);

  const get = (code) => UnloadValidationDao.findOne({ code });

  const put = (unloadValidation: LoadValidation) => new UnloadValidationDao(unloadValidation).save();

  return { get, put };
};

export { buildValidationStorage };
