// FIXME will be do better (this is need because env var is set after import);
process.env.JWT_SECRET = 'forTesting';

import { Request } from 'express';
import {
  buildApiKeyToken,
  generateHash,
  generateToken,
  getApiKeyOwner,
  getTokenFromHeaders,
  isPasswordMatch
} from './security-utils';

describe('security-utils tests', () => {

  it('should match generated hash with password', () => {
    expect(isPasswordMatch('password', generateHash('password'))).toBeTruthy();
  });

  it('invalid authentication token return undefined', () => {
    const request = { headers: { authorization: 'invalid' } } as Request;

    const token = getTokenFromHeaders(request);

    expect(token).toBeUndefined();
  });

  it('missing authentication token return undefined', () => {
    const requestWithoutAuthenticationHeader = { headers: {} } as Request;

    const token = getTokenFromHeaders(requestWithoutAuthenticationHeader);

    expect(token).toBeUndefined();
  });

  it('should retrieve authentication from headers', () => {
    const requestWithoutAuthenticationHeader = { headers: {authorization: 'Bearer xyz'} } as Request;

    const token = getTokenFromHeaders(requestWithoutAuthenticationHeader);

    expect(token).toBe('xyz');
  });

  it('should retrieve owner from apiKey', () => {
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
