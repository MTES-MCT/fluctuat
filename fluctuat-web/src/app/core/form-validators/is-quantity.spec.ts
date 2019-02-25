import { isQuantity } from './is-quantity';

test('should be a valid quantity', () => {

  expect(isQuantity('123')).toBeTruthy();
  expect(isQuantity('123.1')).toBeTruthy();
  expect(isQuantity('123.0123')).toBeTruthy();
  expect(isQuantity('123,0123')).toBeTruthy();

});

test('should not be a valid quantity', () => {

  expect(isQuantity('.9')).toBeFalsy();
  expect(isQuantity(',9')).toBeFalsy();
  expect(isQuantity('123.1.1')).toBeFalsy();
  expect(isQuantity('123,1,1')).toBeFalsy();
  expect(isQuantity('a123')).toBeFalsy();
  expect(isQuantity('a123.1')).toBeFalsy();
  expect(isQuantity('1231.a')).toBeFalsy();
  expect(isQuantity('1231 t')).toBeFalsy();
});
