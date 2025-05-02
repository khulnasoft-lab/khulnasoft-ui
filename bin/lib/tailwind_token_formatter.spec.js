import {
  isAliasValue,
  hasAliases,
  getScalesAndCSSCustomProperties,
  generateBaseColors,
  generateColorMap,
  TailwindTokenFormatter,
} from './tailwind_token_formatter';

const tokens = {
  color: {
    constant: {
      $value: '#000',
      prefix: false,
      original: {
        $value: '#000',
      },
      path: ['color', 'constant'],
    },
    constantObject: {
      $value: '#000',
      prefix: false,
      original: {
        $value: {
          default: '#000',
          dark: '#fff',
        },
      },
      path: ['color', 'constantObject'],
    },
    alias: {
      $value: '#000',
      prefix: false,
      original: {
        $value: '{color.constant}',
        dark: '#fff',
      },
      path: ['color', 'alias'],
    },
    aliasObject: {
      $value: '#000',
      prefix: false,
      original: {
        $value: {
          default: '{color.constant}',
        },
      },
      path: ['color', 'aliasObject'],
    },
    prefixConstant: {
      $value: '#000',
      original: {
        $value: '#000',
      },
      path: ['color', 'prefixConstant'],
    },
    prefixAlias: {
      $value: '#000',
      original: {
        $value: '{color.prefixConstant}',
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
      expect(hasAliases(tokens.color.alias.original.$value)).toBe(true);
    });

    it('returns false when original value is string', () => {
      expect(hasAliases(tokens.color.constant.original.$value)).toBe(false);
    });

    it('returns true when original value property contains alias in a nested object', () => {
      expect(hasAliases(tokens.color.aliasObject.original.$value)).toBe(true);
    });

    it('returns false when original value property contains strings in a nested object', () => {
      expect(hasAliases(tokens.color.constantObject.original.$value)).toBe(false);
    });
  });

  describe('getScalesAndCSSCustomProperties', () => {
    it('should correctly extract cssWithValue property from tokens', () => {
      const colorsTokens = {
        color: {
          cssWithValue: 'var(--blue-50, #e9f3fc)',
        },
        background: {
          cssWithValue: 'var(--blue-100, #cbe2f9)',
        },
      };

      const result = getScalesAndCSSCustomProperties(colorsTokens);

      expect(result).toEqual({
        color: 'var(--blue-50, #e9f3fc)',
        background: 'var(--blue-100, #cbe2f9)',
      });
    });

    it('should handle nested tokens correctly', () => {
      const colorsTokens = {
        color: {
          primary: {
            cssWithValue: '--color-primary: blue;',
          },
          secondary: {
            cssWithValue: '--color-secondary: green;',
          },
        },
        accent: {
          highlight: {
            cssWithValue: '--accent-highlight: yellow;',
          },
          border: {
            cssWithValue: '--accent-border: orange;',
          },
        },
      };

      const result = getScalesAndCSSCustomProperties(colorsTokens);

      expect(result).toEqual({
        color: {
          primary: '--color-primary: blue;',
          secondary: '--color-secondary: green;',
        },
        accent: {
          highlight: '--accent-highlight: yellow;',
          border: '--accent-border: orange;',
        },
      });
    });
  });

  describe('generateBaseColors', () => {
    it('should correctly extract path and cssWithValue from color tokens', () => {
      const colorTokens = {
        primary: {
          blue: {
            path: ['color', 'primary', 'blue'],
            cssWithValue: '--color-primary-blue: #0000ff;',
          },
          red: {
            path: ['color', 'primary', 'red'],
            cssWithValue: '--color-primary-red: #ff0000;',
          },
        },
      };

      const result = generateBaseColors(colorTokens);

      expect(result).toEqual({
        'color-primary-blue': '--color-primary-blue: #0000ff;',
        'color-primary-red': '--color-primary-red: #ff0000;',
      });
    });

    it('should handle a mix of token structures', () => {
      const colorTokens = {
        primary: {
          main: {
            path: ['color', 'primary'],
            cssWithValue: '--color-primary: #0000ff;',
          },
          light: {
            path: ['color', 'primary', 'light'],
            cssWithValue: '--color-primary-light: #3333ff;',
          },
        },
        grayscale: {
          white: {
            path: ['color', 'white'],
            cssWithValue: '--color-white: #ffffff;',
          },
          black: {
            path: ['color', 'black'],
            cssWithValue: '--color-black: #000000;',
          },
          gray: {
            path: ['color', 'gray'],
            cssWithValue: '--color-gray: #888888;',
          },
        },
      };

      const result = generateBaseColors(colorTokens);

      expect(result).toEqual({
        'color-primary': '--color-primary: #0000ff;',
        'color-primary-light': '--color-primary-light: #3333ff;',
        'color-white': '--color-white: #ffffff;',
        'color-black': '--color-black: #000000;',
        'color-gray': '--color-gray: #888888;',
      });
    });
  });

  describe('generateColorMap', () => {
    const mockTokens = {
      background: {
        status: {
          info: { cssWithValue: 'var(--background-status-info, #ffffff)' },
          success: { cssWithValue: 'var(--background-status-success, #f0f0f0)' },
          warning: { cssWithValue: 'var(--background-status-warning, #e0e0e0)' },
        },
        feedback: {
          info: { cssWithValue: 'var(--background-feedback-info, #eeeeee)' },
          success: { cssWithValue: 'var(--background-feedback-success, #dddddd)' },
          warning: { cssWithValue: 'var(--background-feedback-warning, #cccccc)' },
        },
      },
      text: {
        status: {
          info: { cssWithValue: 'var(--text-status-info, #000000)' },
          success: { cssWithValue: 'var(--text-status-success, #111111)' },
          warning: { cssWithValue: 'var(--text-status-warning, #222222)' },
        },
        feedback: {
          info: { cssWithValue: 'var(--text-feedback-info, #333333)' },
          success: { cssWithValue: 'var(--text-feedback-success, #444444)' },
          warning: { cssWithValue: 'var(--text-feedback-warning, #555555)' },
        },
      },
      fill: {
        status: {
          info: { cssWithValue: 'var(--fill-status-info, #0088ff)' },
          success: { cssWithValue: 'var(--fill-status-success, #0077ee)' },
          warning: { cssWithValue: 'var(--fill-status-warning, #0066dd)' },
        },
        feedback: {
          info: { cssWithValue: 'var(--fill-feedback-info, #00aaee)' },
          success: { cssWithValue: 'var(--fill-feedback-success, #0099dd)' },
          warning: { cssWithValue: 'var(--fill-feedback-warning, #0088cc)' },
        },
      },
    };

    it('should generate color map for status element with default properties', () => {
      const variants = ['info', 'success', 'warning'];
      const result = generateColorMap(mockTokens, variants, 'status');

      // Expected output
      const expected = {
        statusBackgroundColors: {
          'status-info': 'var(--background-status-info, #ffffff)',
          'status-success': 'var(--background-status-success, #f0f0f0)',
          'status-warning': 'var(--background-status-warning, #e0e0e0)',
        },
        statusTextColors: {
          'status-info': 'var(--text-status-info, #000000)',
          'status-success': 'var(--text-status-success, #111111)',
          'status-warning': 'var(--text-status-warning, #222222)',
        },
        statusFillColors: {
          'status-info': 'var(--fill-status-info, #0088ff)',
          'status-success': 'var(--fill-status-success, #0077ee)',
          'status-warning': 'var(--fill-status-warning, #0066dd)',
        },
      };

      expect(result).toEqual(expected);
    });

    it('should generate color map for feedback element with default properties', () => {
      const variants = ['info', 'success', 'warning'];
      const result = generateColorMap(mockTokens, variants, 'feedback');

      const expected = {
        feedbackBackgroundColors: {
          'feedback-info': 'var(--background-feedback-info, #eeeeee)',
          'feedback-success': 'var(--background-feedback-success, #dddddd)',
          'feedback-warning': 'var(--background-feedback-warning, #cccccc)',
        },
        feedbackTextColors: {
          'feedback-info': 'var(--text-feedback-info, #333333)',
          'feedback-success': 'var(--text-feedback-success, #444444)',
          'feedback-warning': 'var(--text-feedback-warning, #555555)',
        },
        feedbackFillColors: {
          'feedback-info': 'var(--fill-feedback-info, #00aaee)',
          'feedback-success': 'var(--fill-feedback-success, #0099dd)',
          'feedback-warning': 'var(--fill-feedback-warning, #0088cc)',
        },
      };

      expect(result).toEqual(expected);
    });

    it('should generate color map with custom properties', () => {
      const variants = ['info', 'success'];
      const properties = ['background', 'text'];
      const result = generateColorMap(mockTokens, variants, 'status', properties);

      const expected = {
        statusBackgroundColors: {
          'status-info': 'var(--background-status-info, #ffffff)',
          'status-success': 'var(--background-status-success, #f0f0f0)',
        },
        statusTextColors: {
          'status-info': 'var(--text-status-info, #000000)',
          'status-success': 'var(--text-status-success, #111111)',
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TailwindTokenFormatter', () => {
    let f;

    beforeEach(() => {
      f = new TailwindTokenFormatter(tokens);
    });

    describe('#getAliasedToken', () => {
      it('returns original object of alias', () => {
        expect(f.getAliasedToken(tokens.color.alias.original.$value)).toBe(tokens.color.constant);
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
