import { Waybill } from '../models/waybill';
import { generatePdf } from './generate-pdf';
import { waybillDocDefinition } from './waybill-doc-definition';

export function generateWaybillPdf(waybill: Waybill, baseUrl: string) {
  return generatePdf(waybillDocDefinition(waybill, baseUrl))
}

