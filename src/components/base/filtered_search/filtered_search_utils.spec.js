import { wrapTokenInQuotes } from './filtered_search_utils';

describe('FilteredSearchUtils', () => {
  describe('wrapTokenInQuotes', () => {
    it('returns token if no space is present', () => {
      const token = 'foo';

      expect(wrapTokenInQuotes(token)).toEqual(token);
    });

    it('returns token if already wrapped in quotes', () => {
      const token1 = '"foo"';
      const token2 = "'foo'";

      expect(wrapTokenInQuotes(token1)).toEqual(token1);
      expect(wrapTokenInQuotes(token2)).toEqual(token2);
    });

    it('returns wrapped token', () => {
      const token = 'foo bar';

      expect(wrapTokenInQuotes(token)).toEqual(`"${token}"`);
    });
  });
});
