import { Ship } from '../form-transporter/ship';
import { Company } from '../shared/company';
import { ContractStatus } from './contract-status.enum';
import { Delivery } from './delivery';

export class Contract {
  id: string;
  status: ContractStatus;
  delivery: Delivery;
  transporter: Company;
  ship: Ship;
  documentUrl: string;
  acceptedAt: Date;
  createdAt: Date;
}
