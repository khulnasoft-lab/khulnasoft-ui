/**
 * @param {Set} a
 * @param {Set} b
 * @returns {boolean}
 */
const areSetsEqual = (a, b) => {
  return a.size === b.size && [...a].every((item) => b.has(item));
};

/**
 * @param {string} path
 * @returns {string}
 */
const getParentPath = (path) => {
  const parts = path.split('/');
  parts.pop();
  return parts.join('/');
};

/**
 * @param {object} token
 * @returns {string}
 */
const variableResolvedTypeFromToken = (token) => {
  switch (token.$type) {
    case 'color':
      return 'COLOR';
    case 'dimension':
    case 'number':
      return 'FLOAT';
    case 'string':
      return 'STRING';
    case 'boolean':
      return 'BOOLEAN';
    default:
      throw new Error(`Invalid token $type: ${token.$type}`);
  }
};

/**
 * Check if value is an alias
 * @param {string} value
 * @returns {boolean}
 */
const isAlias = (value) => {
  if (typeof value === 'string') return value.toString().trim().charAt(0) === '{';
  return false;
};

/**
 * Change rgba object to hex
 * @param {object}
 * @returns {string}
 */
const rgbToHex = ({ r, g, b, a = 1 }) => {
  const toHex = (value) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join('');
  return `#${hex}${a !== 1 ? toHex(a) : ''}`;
};

/**
 * Parse color string to rgba object
 * @param {string} value
 * @returns {object}
 */
const parseColor = (value) => {
  const color = value.trim();
  const hexRegex = /^#([A-Fa-f0-9]{6})([A-Fa-f0-9]{2}){0,1}$/;
  const hexShorthandRegex = /^#([A-Fa-f0-9]{3})([A-Fa-f0-9]){0,1}$/;
  const rgbaRegex = /^rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\s*\)$/;

  if (hexRegex.test(color) || hexShorthandRegex.test(color)) {
    const hexValue = color.substring(1);
    const expandedHex =
      hexValue.length === 3 || hexValue.length === 4
        ? hexValue
            .split('')
            .map((char) => char + char)
            .join('')
        : hexValue;

    const alphaValue = expandedHex.length === 8 ? expandedHex.slice(6, 8) : undefined;

    return {
      r: parseInt(expandedHex.slice(0, 2), 16) / 255,
      g: parseInt(expandedHex.slice(2, 4), 16) / 255,
      b: parseInt(expandedHex.slice(4, 6), 16) / 255,
      ...(alphaValue ? { a: parseInt(alphaValue, 16) / 255 } : {}),
    };
  }
  if (rgbaRegex.test(color)) {
    const match = color.match(rgbaRegex);
    const [, red, green, blue, alpha] = match;
    return {
      r: parseInt(red, 10) / 255,
      g: parseInt(green, 10) / 255,
      b: parseInt(blue, 10) / 255,
      a: parseFloat(alpha),
    };
  }
  throw new Error('Invalid color format');
};

/**
 * Compares two colors for approximate equality since converting between Figma RGBA objects (from 0 -> 1) and
 * hex colors can result in slight differences.
 * @param {object} a - rgb(a) object
 * @param {object} b - rgb(a) object
 */
const colorApproximatelyEqual = (a, b) => {
  return rgbToHex(a) === rgbToHex(b);
};

module.exports = {
  areSetsEqual,
  colorApproximatelyEqual,
  getParentPath,
  isAlias,
  parseColor,
  rgbToHex,
  variableResolvedTypeFromToken,
};
