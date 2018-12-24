import { Company } from './company.model';
import { ContractStatus } from './contract-status.enum';
import { Delivery } from './delivery.model';
import { LoadInfo } from './load-info.model';
import { Ship } from './ship.model';
import { UnloadInfo } from './unload-info.model';

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
