import { Waybill } from '../models/waybill';
import { generatePdf } from './generate-pdf';
import { waybillDocDefinition } from './waybill-doc-definition';

export function generateWaybillPdf(waybill: Waybill) {
  return generatePdf(waybillDocDefinition(waybill))
}

