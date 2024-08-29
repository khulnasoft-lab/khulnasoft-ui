import { contextItemsValidator } from './utils';
import { MOCK_CONTEXT_ITEM_FILE, MOCK_CONTEXT_ITEM_MERGE_REQUEST } from './mock_context_data';

describe('contextItemsValidator', () => {
  describe.each([
    { value: [], description: 'empty array' },
    {
      value: [MOCK_CONTEXT_ITEM_FILE],
      description: 'one valid item',
    },
    {
      value: [MOCK_CONTEXT_ITEM_FILE, MOCK_CONTEXT_ITEM_MERGE_REQUEST],
      description: 'multiple valid items',
    },
  ])('with "$description"', ({ value }) => {
    it('returns true', () => {
      expect(contextItemsValidator(value)).toBe(true);
    });
  });

  describe.each([
    { value: null, description: 'null' },
    { value: undefined, description: 'undefined' },
    { value: {}, description: 'object instead of array' },
    { value: 'not an array', description: 'string instead of array' },
    { value: 42, description: 'number instead of array' },
    {
      value: [{ id: '1', metadata: { name: 'Item 1' } }],
      description: 'array with item missing isEnabled',
    },
    {
      value: [{ metadata: { name: 'Item 1' }, isEnabled: true }],
      description: 'array with item missing id',
    },
    {
      value: [{ id: '1', metadata: {}, isEnabled: true }],
      description: 'array with item having empty metadata',
    },
    {
      value: [{ id: '1', metadata: { name: '' }, isEnabled: true }],
      description: 'array with item having empty name',
    },
    {
      value: [{ id: '1', metadata: { name: 'Item 1' }, isEnabled: 'true' }],
      description: 'array with item having non-boolean isEnabled',
    },
    {
      value: [MOCK_CONTEXT_ITEM_FILE, { metadata: { name: 'Item 2' }, isEnabled: false }],
      description: 'array with one valid and one invalid item',
    },
  ])('with "$description"', ({ value }) => {
    it('returns false', () => {
      expect(contextItemsValidator(value)).toBe(false);
    });
  });
});
