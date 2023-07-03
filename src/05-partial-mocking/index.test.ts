// Uncomment the code below and write your tests
import _ from 'lodash';
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => 'foo'),
    mockTwo: jest.fn(() => 'bar'),
    mockThree: jest.fn(() => 'baz'),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
  });
});
