import { hello } from './utils.js';
import { test, expect } from 'vitest';

test('hello', () => {
  expect(hello({ name: 'Rein' })).toBe('Hello, Rein!');
});
