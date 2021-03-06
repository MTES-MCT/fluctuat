import { getValidReceivers } from './email.utils';

describe('getReceivers', () => {

  test('should filter invalid emails', () => {
    const emails = [
      { name: '', email: '' },
      { name: 'stuart mill', email: 'stuart@fluctuat.beta.gouv.fr' },
      { name: 'no body', email: '' },
      { email: 'jevons@fluctuat.beta.gouv.fr' },
      {} // empty
    ];

    expect(getValidReceivers(emails)).toEqual([
      { Email: 'stuart@fluctuat.beta.gouv.fr', Name: 'stuart mill' },
      { Email: 'jevons@fluctuat.beta.gouv.fr', Name: '' }
    ]);
  });

});
