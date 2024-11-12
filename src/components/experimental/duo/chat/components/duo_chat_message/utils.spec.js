/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

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
