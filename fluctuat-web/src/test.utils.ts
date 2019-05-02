import { Person } from './app/waybill/shared/models/person.model';

export const buildPerson = (name, email?) =>
  Person.fromObj({ name: name, email: email });

export const getElemByTestId = (nativeElement) => (dataTestId) =>
  nativeElement.querySelector(`[data-test-id=${dataTestId}]`);
