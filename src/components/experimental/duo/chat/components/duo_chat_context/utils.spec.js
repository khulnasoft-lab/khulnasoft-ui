import {
  categoriesValidator,
  categoryValidator,
  contextItemsValidator,
  contextItemValidator,
  formatGitItemSecondaryText,
  formatIssueId,
  formatMergeRequestId,
  getContextItemIcon,
  getContextItemTypeLabel,
  wrapIndex,
} from './utils';
import {
  getMockCategory,
  MOCK_CATEGORIES,
  MOCK_CONTEXT_ITEM_FILE,
  MOCK_CONTEXT_ITEM_FILE_DISABLED,
  MOCK_CONTEXT_ITEM_GIT_COMMIT,
  MOCK_CONTEXT_ITEM_GIT_DIFF,
  MOCK_CONTEXT_ITEM_ISSUE,
  MOCK_CONTEXT_ITEM_MERGE_REQUEST,
} from './mock_context_data';

describe('duo_chat_context utils', () => {
  describe('categoryValidator', () => {
    it.each(MOCK_CATEGORIES)('returns true for a valid category', (category) => {
      expect(categoryValidator(category)).toBe(true);
    });

    it.each([
      { value: { value: 'test', label: 'Test' }, description: 'missing icon' },
      { value: { value: 'test', icon: 'icon' }, description: 'missing label' },
      { value: { label: 'Test', icon: 'icon' }, description: 'missing value' },
      { value: {}, description: 'empty object' },
      { value: null, description: 'null' },
      { value: undefined, description: 'undefined' },
    ])('returns false for "$description"', ({ value }) => {
      expect(categoryValidator(value)).toBe(false);
    });
  });

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

  describe('contextItemValidator', () => {
    describe('with a valid item', () => {
      it('returns true for a valid file item', () => {
        expect(contextItemValidator(MOCK_CONTEXT_ITEM_FILE)).toBe(true);
      });

      it('returns true for a valid merge request item', () => {
        expect(contextItemValidator(MOCK_CONTEXT_ITEM_MERGE_REQUEST)).toBe(true);
      });

      it('returns true for a valid disabled item', () => {
        expect(contextItemValidator(MOCK_CONTEXT_ITEM_FILE_DISABLED)).toBe(true);
      });
    });

    describe.each([
      { value: null, description: 'null' },
      { value: undefined, description: 'undefined' },
      { value: {}, description: 'empty object' },
      { value: 'not an item', description: 'string instead of object' },
      { value: 42, description: 'number instead of object' },
      {
        value: { ...MOCK_CONTEXT_ITEM_FILE, id: undefined },
        description: 'missing id',
      },
      {
        value: { ...MOCK_CONTEXT_ITEM_FILE, category: undefined },
        description: 'missing category',
      },
      {
        value: { ...MOCK_CONTEXT_ITEM_FILE, metadata: undefined },
        description: 'missing metadata',
      },
      {
        value: {
          ...MOCK_CONTEXT_ITEM_FILE,
          metadata: {
            ...MOCK_CONTEXT_ITEM_FILE.metadata,
            enabled: undefined,
          },
        },
        description: 'missing enabled',
      },
      {
        value: {
          ...MOCK_CONTEXT_ITEM_FILE,
          metadata: {
            ...MOCK_CONTEXT_ITEM_FILE.metadata,
            enabled: 'true',
          },
        },
        description: 'non-boolean enabled',
      },
      {
        value: {
          ...MOCK_CONTEXT_ITEM_FILE,
          metadata: {
            ...MOCK_CONTEXT_ITEM_FILE.metadata,
            disabledReasons: 'not an array',
          },
        },
        description: 'non-array disabledReasons',
      },
      {
        value: {
          ...MOCK_CONTEXT_ITEM_FILE,
          metadata: {
            ...MOCK_CONTEXT_ITEM_FILE.metadata,
            disabledReasons: [42],
          },
        },
        description: 'non-string items in disabledReasons array',
      },
    ])('with "$description"', ({ value }) => {
      it('returns false', () => {
        expect(contextItemValidator(value)).toBe(false);
      });
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
      { value: {}, description: 'empty object' },
      { value: 'not an item', description: 'string instead of array' },
      { value: 42, description: 'number instead of array' },
      {
        value: [{ ...MOCK_CONTEXT_ITEM_FILE, id: undefined }],
        description: 'missing id',
      },
      {
        value: [{ ...MOCK_CONTEXT_ITEM_FILE, category: undefined }],
        description: 'missing category',
      },
      {
        value: [{ ...MOCK_CONTEXT_ITEM_FILE, metadata: undefined }],
        description: 'missing metadata',
      },
      {
        value: [
          {
            ...MOCK_CONTEXT_ITEM_FILE,
            metadata: {
              ...MOCK_CONTEXT_ITEM_FILE.metadata,
              enabled: undefined,
            },
          },
        ],
        description: 'missing enabled',
      },
      {
        value: [
          {
            ...MOCK_CONTEXT_ITEM_FILE,
            metadata: {
              ...MOCK_CONTEXT_ITEM_FILE.metadata,
              enabled: 'true',
            },
          },
        ],
        description: 'non-boolean enabled',
      },
      {
        value: [
          {
            ...MOCK_CONTEXT_ITEM_FILE,
            metadata: {
              ...MOCK_CONTEXT_ITEM_FILE.metadata,
              disabledReasons: 'not an array',
            },
          },
        ],
        description: 'non-array disabledReasons',
      },
      {
        value: [
          {
            ...MOCK_CONTEXT_ITEM_FILE,
            metadata: {
              ...MOCK_CONTEXT_ITEM_FILE.metadata,
              disabledReasons: [42],
            },
          },
        ],
        description: 'non-string items in disabledReasons array',
      },
      {
        value: [MOCK_CONTEXT_ITEM_FILE, { id: 1234, invalid: true }],
        description: 'array with one valid and one invalid item',
      },
    ])('with "$description"', ({ value }) => {
      it('returns false', () => {
        expect(contextItemsValidator(value)).toBe(false);
      });
    });
  });

  describe('formatIssueId', () => {
    it.each([
      { id: '123', expected: '#123' },
      { id: 123, expected: '#123' },
    ])('formats "$id" as "$expected"', ({ id, expected }) => {
      expect(formatIssueId(id)).toBe(expected);
    });

    it('returns empty string for falsy values', () => {
      expect(formatIssueId()).toBe('');
      expect(formatIssueId(null)).toBe('');
      expect(formatIssueId('')).toBe('');
    });
  });

  describe('formatMergeRequestId', () => {
    it.each([
      { id: '123', expected: '!123' },
      { id: 123, expected: '!123' },
    ])('formats "$id" as "$expected"', ({ id, expected }) => {
      expect(formatMergeRequestId(id)).toBe(expected);
    });

    it('returns empty string for falsy values', () => {
      expect(formatMergeRequestId()).toBe('');
      expect(formatMergeRequestId(null)).toBe('');
      expect(formatMergeRequestId('')).toBe('');
    });
  });

  describe('getContextItemIcon', () => {
    describe('Git items', () => {
      it.each([
        ['commit', MOCK_CONTEXT_ITEM_GIT_COMMIT],
        ['comparison', MOCK_CONTEXT_ITEM_GIT_DIFF],
      ])('returns "%s" icon for git %s items', (expected, gitItem) => {
        expect(getContextItemIcon(gitItem)).toBe(expected);
      });

      it('returns "git" icon for unknown git types', () => {
        const unknownGitItem = {
          ...MOCK_CONTEXT_ITEM_GIT_COMMIT,
          metadata: { ...MOCK_CONTEXT_ITEM_GIT_COMMIT.metadata, gitType: 'unknown' },
        };
        expect(getContextItemIcon(unknownGitItem)).toBe('git');
      });
    });

    describe('Non-Git items', () => {
      it.each([
        [MOCK_CONTEXT_ITEM_FILE, 'document'],
        [MOCK_CONTEXT_ITEM_ISSUE, 'issues'],
        [MOCK_CONTEXT_ITEM_MERGE_REQUEST, 'merge-request'],
      ])('returns correct icon for %s category', (item, expected) => {
        expect(getContextItemIcon(item)).toBe(expected);
      });

      it('returns null for unknown categories', () => {
        const unknownItem = { category: 'unknown' };
        expect(getContextItemIcon(unknownItem)).toBeNull();
      });
    });

    it('uses category icon when provided', () => {
      const category = getMockCategory(MOCK_CONTEXT_ITEM_FILE.category);
      expect(getContextItemIcon(MOCK_CONTEXT_ITEM_FILE, category)).toBe(category.icon);
    });
  });

  describe('getContextItemTypeLabel', () => {
    it.each([
      { contextItem: MOCK_CONTEXT_ITEM_FILE, expected: 'Project file' },
      { contextItem: MOCK_CONTEXT_ITEM_ISSUE, expected: 'Issue' },
      { contextItem: MOCK_CONTEXT_ITEM_MERGE_REQUEST, expected: 'Merge request' },
      { contextItem: MOCK_CONTEXT_ITEM_GIT_DIFF, expected: 'Local Git repository diff' },
      { contextItem: MOCK_CONTEXT_ITEM_GIT_COMMIT, expected: 'Local Git repository commit' },
    ])('returns "$expected" for "$contextItem.category"', ({ contextItem, expected }) => {
      expect(getContextItemTypeLabel(contextItem)).toEqual(expected);
    });
  });

  describe('formatGitItemSecondaryText', () => {
    it('formats secondary text with repository name and commit ID for commit items', () => {
      const result = formatGitItemSecondaryText(MOCK_CONTEXT_ITEM_GIT_COMMIT);
      expect(result).toBe('example/garden - 20f8caf94cb8f5e5f9dbd1a9ac32702321de201b');
    });

    it('formats secondary text with only repository name and commit ID for diff items', () => {
      const result = formatGitItemSecondaryText(MOCK_CONTEXT_ITEM_GIT_DIFF);
      expect(result).toBe('example/garden - main');
    });

    it('handles items without commitId', () => {
      const itemWithoutCommitId = {
        ...MOCK_CONTEXT_ITEM_GIT_DIFF,
        metadata: { ...MOCK_CONTEXT_ITEM_GIT_DIFF.metadata, commitId: undefined },
      };
      const result = formatGitItemSecondaryText(itemWithoutCommitId);
      expect(result).toBe('example/garden');
    });
  });

  describe('wrapIndex', () => {
    it('wraps forward within bounds', () => {
      expect(wrapIndex(2, 1, 5)).toBe(3);
    });

    it('wraps backward within bounds', () => {
      expect(wrapIndex(2, -1, 5)).toBe(1);
    });

    it('wraps forward beyond upper bound', () => {
      expect(wrapIndex(4, 1, 5)).toBe(0);
    });

    it('wraps backward beyond lower bound', () => {
      expect(wrapIndex(0, -1, 5)).toBe(4);
    });

    it('wraps forward multiple steps', () => {
      expect(wrapIndex(3, 3, 5)).toBe(1);
    });

    it('wraps backward multiple steps', () => {
      expect(wrapIndex(1, -3, 5)).toBe(3);
    });

    it('handles zero step', () => {
      expect(wrapIndex(2, 0, 5)).toBe(2);
    });

    it('handles step larger than total length', () => {
      expect(wrapIndex(1, 7, 5)).toBe(3);
    });

    it('handles negative step larger than total length', () => {
      expect(wrapIndex(3, -7, 5)).toBe(1);
    });

    it('works with single-item array', () => {
      expect(wrapIndex(0, 1, 1)).toBe(0);
      expect(wrapIndex(0, -1, 1)).toBe(0);
    });
  });
});
