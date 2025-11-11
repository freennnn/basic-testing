// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList([1, 2, 3]);
    expect(linkedList).toStrictEqual({
      value: 1,
      next: { value: 2, next: { value: 3, next: { value: null, next: null } } },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = [99, 100];
    const linkedList = generateLinkedList(values);
    expect(linkedList).toMatchSnapshot();
  });
});
