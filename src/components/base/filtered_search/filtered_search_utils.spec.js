import { splitOnQuotes, wrapTokenInQuotes } from './filtered_search_utils';

describe('FilteredSearchUtils', () => {
  describe('splitOnQuotes', () => {
    it.each`
      token                | result
      ${'"foo bar'}        | ${[]}
      ${'"foo bar\''}      | ${[]}
      ${'"foo" bar'}       | ${[]}
      ${'"foo" \'bar\''}   | ${[]}
      ${'foo "bar"'}       | ${['foo']}
      ${'foo "bar" "baz"'} | ${['foo', '"bar "', 'baz']}
      ${'"foo" "bar"'}     | ${['"foo" "bar"']}
      ${'"foo" "bar baz"'} | ${['"foo" "bar baz"']}
    `('given "$token" returns $result', ({ token, result }) => {
      expect(splitOnQuotes(token)).toEqual(result);
    });

    it('returns token as an array', () => {
      const token = 'token';

      expect(splitOnQuotes(token)).toEqual([token]);
    });

    it('splits the token by spaces', () => {
      const token = 'some token with spaces';

      expect(splitOnQuotes(token)).toEqual(['some', 'token', 'with', 'spaces']);
    });

    it("doesn't split if token is inside quotes", () => {
      const token = '"token inside"';

      expect(splitOnQuotes(token)).toEqual([token]);
    });

    it("doesn't split if the token has multiple quotes", () => {
      const token = `'My "old" milestone'`;

      expect(splitOnQuotes(token)).toEqual([token]);
    });
  });

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
