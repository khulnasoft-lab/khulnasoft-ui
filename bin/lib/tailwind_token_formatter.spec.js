import { isAliasValue, hasAliases, TailwindTokenFormatter } from './tailwind_token_formatter';

const tokens = {
  color: {
    constant: {
      value: '#000',
      prefix: false,
      original: {
        value: '#000',
      },
      path: ['color', 'constant'],
    },
    constantObject: {
      value: '#000',
      prefix: false,
      original: {
        value: {
          default: '#000',
          dark: '#fff',
        },
      },
      path: ['color', 'constantObject'],
    },
    alias: {
      value: '#000',
      prefix: false,
      original: {
        value: '{color.constant}',
        dark: '#fff',
      },
      path: ['color', 'alias'],
    },
    aliasObject: {
      value: '#000',
      prefix: false,
      original: {
        value: {
          default: '{color.constant}',
        },
      },
      path: ['color', 'aliasObject'],
    },
    prefixConstant: {
      value: '#000',
      original: {
        value: '#000',
      },
      path: ['color', 'prefixConstant'],
    },
    prefixAlias: {
      value: '#000',
      original: {
        value: '{color.prefixConstant}',
      },
      path: ['color', 'prefixAlias'],
    },
  },
};

describe('Tailwind Token Formatter', () => {
  describe('isAliasValue', () => {
    it('returns true when value is alias', () => {
      expect(isAliasValue('{color.alias}')).toBe(true);
    });

    it('returns false when value is string', () => {
      expect(isAliasValue('#fff')).toBe(false);
    });
  });

  describe('hasAliases', () => {
    it('returns true when original value is alias', () => {
      expect(hasAliases(tokens.color.alias.original.value)).toBe(true);
    });

    it('returns false when original value is string', () => {
      expect(hasAliases(tokens.color.constant.original.value)).toBe(false);
    });

    it('returns true when original value property contains alias in a nested object', () => {
      expect(hasAliases(tokens.color.aliasObject.original.value)).toBe(true);
    });

    it('returns false when original value property contains strings in a nested object', () => {
      expect(hasAliases(tokens.color.constantObject.original.value)).toBe(false);
    });
  });

  describe('TailwindTokenFormatter', () => {
    let f;

    beforeEach(() => {
      f = new TailwindTokenFormatter(tokens);
    });

    describe('#getAliasedToken', () => {
      it('returns original object of alias', () => {
        expect(f.getAliasedToken(tokens.color.alias.original.value)).toBe(tokens.color.constant);
      });
    });

    describe('#aliasToCSSCustomProperty', () => {
      it('returns CSS custom property of alias', () => {
        expect(f.aliasToCSSCustomProperty(tokens.color.alias)).toBe('var(--color-constant, #000)');
      });
    });

    describe('#cssCustomPropertyWithValue', () => {
      it('returns CSS custom property with default value of #000', () => {
        expect(f.cssCustomPropertyWithValue(tokens.color.constant)).toBe(
          'var(--color-constant, #000)'
        );
      });

      it('returns CSS custom property with default value of var(--color-constant)', () => {
        expect(f.cssCustomPropertyWithValue(tokens.color.alias)).toBe(
          'var(--color-alias, var(--color-constant, #000))'
        );
      });

      it('returns CSS custom property with prefix and default value of #000', () => {
        expect(f.cssCustomPropertyWithValue(tokens.color.prefixConstant)).toBe(
          'var(--gl-color-prefixConstant, #000)'
        );
      });

      it('returns CSS custom property with default value of var(--gl-color-constant)', () => {
        expect(f.cssCustomPropertyWithValue(tokens.color.prefixAlias)).toBe(
          'var(--gl-color-prefixAlias, var(--gl-color-prefixConstant, #000))'
        );
      });
    });
  });
});
