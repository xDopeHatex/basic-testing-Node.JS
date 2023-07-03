import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const val = 'val;';
    const res = await resolveValue(val);
    expect(res).toBe(val);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const mes = 'Test error message';
    expect(() => throwError(mes)).toThrow(mes);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(() => rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
