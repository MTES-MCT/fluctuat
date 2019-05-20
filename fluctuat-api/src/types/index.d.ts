import { Request } from 'express';
import { User } from '../models/user';
import { Waybill } from '../models/waybill';

export type UserRequest = Request & { user: User };
export type WaybillRequest = Request & { waybill: Waybill };
