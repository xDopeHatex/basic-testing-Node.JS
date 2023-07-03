// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3];
    const linkedListMatcher = {
      next: { next: { next: { next: null, value: null }, value: 3 }, value: 2 },
      value: 1,
    };
    const linkedList = generateLinkedList(values);
    expect(linkedList).toStrictEqual(linkedListMatcher);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = [1, 2, 4];
    const linkedList = generateLinkedList(values);
    expect(linkedList).toMatchSnapshot();
  });
});
