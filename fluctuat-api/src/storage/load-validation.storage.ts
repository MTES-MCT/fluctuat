import { Document, model, Model } from 'mongoose';
import { LoadValidation } from '../models/load-validation';
import { LoadValidationSchema } from './schemas/load-validation.schema';

interface LoadValidationDocument extends LoadValidation, Document {
}

const LoadValidationDao: Model<LoadValidationDocument> = model<LoadValidationDocument>('LoadValidation', LoadValidationSchema);

const get = (code) => LoadValidationDao.findOne({ code });

const put = (loadValidation: LoadValidation) => new LoadValidationDao(loadValidation).save();

export { get, put };
