import { Schema } from 'mongoose';

import { MerchandiseSchema } from './merchandise.schema';
import { MiddlemanShema } from './middleman.schema';
import { PersonSchema } from './person.schema';
import { PortInfoSchema } from './port-info.schema';
import { ShipSchema } from './ship.schema';
import { TransporterSchema } from './transporter.schema';

export const OrderInfoSchema: Schema = new Schema({
  customer: PersonSchema,
  sender: PersonSchema,
  receiver: PersonSchema,
  middleman: MiddlemanShema,
  transporter: TransporterSchema,
  ship: ShipSchema,
  originInfo: PortInfoSchema,
  destinationInfo: PortInfoSchema,
  merchandise: MerchandiseSchema
});
