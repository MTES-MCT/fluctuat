import { Document, model, Model } from 'mongoose';
import { LoadValidation } from '../models/load-validation';
import { LoadValidationSchema } from './schemas/load-validation.schema';

interface UnLoadValidationDocument extends LoadValidation, Document {
}

const UnloadValidationDao: Model<UnLoadValidationDocument> = model<UnLoadValidationDocument>('UnloadValidation', LoadValidationSchema);

const get = (code) => UnloadValidationDao.findOne({ code });

const put = (unloadValidation: LoadValidation) => new UnloadValidationDao(unloadValidation).save();

export { get, put };
