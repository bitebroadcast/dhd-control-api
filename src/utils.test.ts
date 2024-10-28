import { add, hello } from './utils';
import { test, expect } from 'vitest';

test('hello', () => {
  expect(hello({ name: 'Rein' })).toBe('Hello, Rein!');
});

test('add', () => {
  expect(add(1, 2)).toBe(3);
});
