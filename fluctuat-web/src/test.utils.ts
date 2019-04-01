import { Person } from './app/waybill/shared/models/person.model';

export const buildPerson = (name, email?) => {
  return Person.fromObj({ name: name, email: email });
};
