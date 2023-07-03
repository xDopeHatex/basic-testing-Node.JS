import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 7, b: 5, action: Action.Add, expected: 12 },
  { a: 7, b: 5, action: Action.Subtract, expected: 2 },
  { a: 7, b: 5, action: Action.Multiply, expected: 35 },
  { a: 20, b: 10, action: Action.Divide, expected: 2 },
  { a: 2, b: 6, action: Action.Exponentiate, expected: 64 },
  { a: 7, b: 5, action: 'invalid', expected: null },
  { a: 's', b: 'a', action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should calculate %p correctly',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
