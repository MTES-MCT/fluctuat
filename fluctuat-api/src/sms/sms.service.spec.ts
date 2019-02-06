import { SmsService } from './sms.service';

test('should convert phone number to international format', () => {

  const smsService = new SmsService(null);

  expect(smsService.convert(" 06 01 02 03 04 ")).toBe("+33601020304")
});
