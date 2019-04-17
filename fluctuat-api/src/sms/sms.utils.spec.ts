import { convert } from './sms.utils';

test('should convert phone number to international format', () => {
  const frenchPhoneWithSpaces = ' 06 01 02 03 04 ';

  const convertedPhone = convert(frenchPhoneWithSpaces);

  expect(convertedPhone).toBe('+33601020304');
});
