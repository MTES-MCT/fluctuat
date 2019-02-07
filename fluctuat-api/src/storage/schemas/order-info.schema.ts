import { Schema } from 'mongoose';
import { PersonSchema } from './person.schema';
import { ShipSchema } from './ship.schema';

export const OrderInfoSchema: Schema = new Schema({
  customer: PersonSchema,
  sender: PersonSchema,
  receiver: PersonSchema,
  transporter: PersonSchema,
  ship: ShipSchema
});
