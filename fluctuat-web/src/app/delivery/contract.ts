import { Ship } from '../form-transporter/ship';
import { Company } from '../shared/company';
import { LoadInfo } from '../waybill/load-info';
import { UnloadInfo } from '../waybill/unload-info';
import { ContractStatus } from './contract-status.enum';
import { Delivery } from './delivery';

export class Contract {
  id: string;
  status: ContractStatus;
  delivery: Delivery;
  transporter: Company;
  ship: Ship;
  documentUrl: string;
  loadInfo: LoadInfo;
  unloadInfo: UnloadInfo;

  acceptedAt: Date;
  createdAt: Date;
  loadedAt: Date;
  confirmedAt: Date;
  unloadedAt: Date;
  receivedAt: Date;
}
