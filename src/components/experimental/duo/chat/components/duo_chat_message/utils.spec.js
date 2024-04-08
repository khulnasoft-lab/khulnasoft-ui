import { concatUntilEmpty } from './utils';

describe('concatUntilEmpty utility', () => {
  it('returns empty string if input array is falsy', () => {
    expect(concatUntilEmpty()).toEqual('');
    expect(concatUntilEmpty(null)).toEqual('');
    expect(concatUntilEmpty(undefined)).toEqual('');
  });

  it('concatenates array elements until first falsy element', () => {
    const arr = ['a', 'b', undefined, 'c'];
    expect(concatUntilEmpty(arr)).toEqual('ab');
  });

  it('concatenates all array elements if none are falsy', () => {
    const arr = ['a', 'b', 'c'];
    expect(concatUntilEmpty(arr)).toEqual('abc');
  });

  it('returns empty string if first element is falsy', () => {
    const arr = [undefined, 'b', 'c'];
    expect(concatUntilEmpty(arr)).toEqual('');
  });
});
