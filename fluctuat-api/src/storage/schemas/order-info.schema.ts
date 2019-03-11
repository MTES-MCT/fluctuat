import { Schema } from 'mongoose';
import { PersonSchema } from './person.schema';
import { ShipSchema } from './ship.schema';
import { MiddlemanShema } from './middleman.schema';

export const OrderInfoSchema: Schema = new Schema({
  customer: PersonSchema,
  sender: PersonSchema,
  receiver: PersonSchema,
  middleman: MiddlemanShema,
  transporter: PersonSchema,
  ship: ShipSchema
});
