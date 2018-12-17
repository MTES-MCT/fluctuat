import { Transporter } from '../form-transporter/transporter';
import { ContractStatus } from './contract-status.enum';
import { Delivery } from './delivery';

export class Contract {
  id: string;
  status: ContractStatus;
  delivery: Delivery;
  transporter: Transporter;
  documentUrl: string;
  acceptedAt: Date;
  createdAt: Date;
}
