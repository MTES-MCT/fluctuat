import { Schema } from 'mongoose';

export const MerchandiseSchema = new Schema({
  nature: String,
  weight: String,
  price: String
}, { _id: false });
