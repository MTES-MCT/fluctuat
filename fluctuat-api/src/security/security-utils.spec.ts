// FIXME will be do better (this is need because env var is set after import);
process.env.JWT_SECRET = 'forTesting';

import { buildApiKeyToken, generateHash, generateToken, getApiKeyOwner, isPasswordMatch } from './security-utils';

describe('security-utils tests', () => {

  it('should match generated hash with password', () => {
    expect(isPasswordMatch('password', generateHash('password'))).toBeTruthy();
  });

  it('can retrieve owner from apiKey', () => {
    const owner = 'test@me';
    const token = buildApiKeyToken(owner);

    const result = getApiKeyOwner(token);

    expect(result).toBe(owner);
  });

  it('invalid apiToken return undefined', () => {
    const payload = {
      email: 'test@me',
      name: 'test'
    };

    const token = generateToken(payload);

    const result = getApiKeyOwner(token);

    expect(result).toBeUndefined();

  });
});
