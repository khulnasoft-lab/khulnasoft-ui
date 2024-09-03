import { categoriesValidator, contextItemsValidator } from './utils';
import {
  MOCK_CATEGORIES,
  MOCK_CONTEXT_ITEM_FILE,
  MOCK_CONTEXT_ITEM_MERGE_REQUEST,
} from './mock_context_data';

describe('duo_chat_context utils', () => {
  describe('categoriesValidator', () => {
    it('returns true for valid categories', () => {
      expect(categoriesValidator(MOCK_CATEGORIES)).toBe(true);
    });

    it.each([
      { value: null, description: 'null' },
      { value: undefined, description: 'undefined' },
      { value: {}, description: 'object instead of array' },
      { value: 'not an array', description: 'string instead of array' },
      { value: 42, description: 'number instead of array' },
      {
        value: [{ value: 'test', label: 'Test' }],
        description: 'array with invalid category (missing icon)',
      },
      {
        value: [{ value: 'test', icon: 'icon' }],
        description: 'array with invalid category (missing label)',
      },
      {
        value: [{ label: 'Test', icon: 'icon' }],
        description: 'array with invalid category (missing value)',
      },
      {
        value: [MOCK_CATEGORIES.at(0), MOCK_CATEGORIES.at(1), { label: 'Test' }],
        description: 'array with mix of valid and invalid categories',
      },
    ])('returns false for "$description', ({ value }) => {
      expect(categoriesValidator(value)).toBe(false);
    });
  });

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
});
