import { generateHash, isPasswordMatch } from './security-utils';

describe('security-utils tests', () => {

  it('should match generated hash with password', () => {
    expect(isPasswordMatch('password', generateHash('password'))).toBeTruthy();
  });
});
