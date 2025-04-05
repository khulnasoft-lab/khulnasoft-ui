/**
 * Returns if value is an alias to another token
 * name e.g. {text.color.default}
 *
 * @param {string} value
 * @returns {boolean}
 */
const isAliasValue = (value) => typeof value === 'string' && value.includes('{');

/**
 * Returns if the original token value is an alias to another token or
 * is an object which has strings that alias to another token
 *
 * @param {string|object} value token.original.value
 * @returns {boolean}
 */
const hasAliases = (value) => {
  if (typeof value === 'object') {
    return Object.values(value).some((val) => isAliasValue(val) || hasAliases(val));
  }
  return isAliasValue(value);
};

class TailwindFormatter {
  constructor(tokens) {
    this.allTokens = tokens;
  }

  /**
   * Original token object of alias from COMPILED_TOKENS
   *
   * @param {string|object} value token.original.value
   * @returns {object} original token object
   */
  getAliasedToken = (value) => {
    const keys = value.slice(1, -1).split('.');
    return keys.reduce((obj, key) => obj && obj[key], this.allTokens);
  };

  /**
   * CSS custom property from alias token path.
   * Include prefix if original token does not have `"prefix": false`
   *
   * @param {object} token
   * @returns {string} CSS custom property with default value
   */
  aliasToCSSCustomProperty = (token) => {
    const { $value } = token.original;
    const aliasedToken =
      typeof $value === 'string'
        ? this.getAliasedToken($value)
        : this.getAliasedToken($value.default);
    const prefix = aliasedToken.prefix !== false ? 'gl' : false;
    return `var(--${[prefix, ...aliasedToken.path].filter(Boolean).join('-')}, ${token.$value})`;
  };

  /**
   * CSS custom property with default value
   *
   * @param {object} token
   * @returns {string} CSS custom property with default value
   */
  cssCustomPropertyWithValue = (token) => {
    const path = [token.prefix !== false ? 'gl' : false, ...token.path].filter(Boolean);
    const value = hasAliases(token.original.$value)
      ? this.aliasToCSSCustomProperty(token)
      : token.$value;
    return `var(--${path.join('-')}, ${value})`;
  };
}

module.exports = {
  TailwindTokenFormatter: TailwindFormatter,
  hasAliases,
  isAliasValue,
};
