import { Document, model, Model } from 'mongoose';
import { ApiKey } from '../models/api-key';
import { ApiKeySchema } from './schemas/api-key.schema';

interface ApiKeyDocument extends ApiKey, Document {
}

const ApiKeyDao: Model<ApiKeyDocument> = model<ApiKeyDocument>('ApiKey', ApiKeySchema);

const get = (key) => ApiKeyDao.findOne({ key });

const put = (apiKey: ApiKey) => new ApiKeyDao(apiKey).save();

const getAll = () => ApiKeyDao.find();

const deleteKey = (id) => ApiKeyDao.findByIdAndDelete(id);

export { get, put, getAll, deleteKey };
