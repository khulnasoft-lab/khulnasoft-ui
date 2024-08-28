import { isVisible } from '../vendor/bootstrap-vue/src/utils/dom';
import { COMMA, CONTRAST_LEVELS, labelColorOptions, focusableTags } from './constants';

export function debounceByAnimationFrame(fn) {
  let requestId;

  return function debounced(...args) {
    if (requestId) {
      window.cancelAnimationFrame(requestId);
    }
    requestId = window.requestAnimationFrame(() => fn.apply(this, args));
  };
}

export function throttle(fn) {
  let frameId = null;

  return (...args) => {
    if (frameId) {
      return;
    }

    frameId = window.requestAnimationFrame(() => {
      fn(...args);
      frameId = null;
    });
  };
}

export function rgbFromHex(hex) {
  const cleanHex = hex.replace('#', '');
  const rgb =
    cleanHex.length === 3
      ? cleanHex.split('').map((val) => val + val)
      : cleanHex.match(/[\da-f]{2}/gi);
  const [r, g, b] = rgb.map((val) => parseInt(val, 16));
  return [r, g, b];
}

export function rgbFromString(color, sub) {
  const rgb = color.substring(sub, color.length - 1).split(COMMA);
  const [r, g, b] = rgb.map((i) => parseInt(i, 10));
  return [r, g, b];
}

export function hexToRgba(hex, opacity = 1) {
  const [r, g, b] = rgbFromHex(hex);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function toSrgb(value) {
  const normalized = value / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

export function rgbToHsl(hexColor) {
  const color = hexColor.replace('#', '');

  // Convert hex to RGB first
  let r = 0;
  let g = 0;
  let b = 0;
  if (color.length === 3) {
    // eslint-disable-next-line prefer-template
    r = '0x' + color[0] + color[0];
    // eslint-disable-next-line prefer-template
    g = '0x' + color[1] + color[1];
    // eslint-disable-next-line prefer-template
    b = '0x' + color[2] + color[2];
  } else if (color.length === 6) {
    // eslint-disable-next-line prefer-template
    r = '0x' + color[0] + color[1];
    // eslint-disable-next-line prefer-template
    g = '0x' + color[2] + color[3];
    // eslint-disable-next-line prefer-template
    b = '0x' + color[4] + color[5];
  }

  // Convert to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = Number((s * 100).toFixed(1));
  l = Number((l * 100).toFixed(1));

  return { h, s, l };
}

export function relativeLuminance(rgb) {
  // WCAG 2.1 formula: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
  // -
  // WCAG 3.0 will use APAC
  // Using APAC would be the ultimate goal, but was dismissed by engineering as of now
  // See https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/3418#note_1370107090
  return 0.2126 * toSrgb(rgb[0]) + 0.7152 * toSrgb(rgb[1]) + 0.0722 * toSrgb(rgb[2]);
}

export function colorFromBackground(backgroundColor, contrastRatio = 2.4) {
  let color;
  const lightColor = rgbFromHex('#FFFFFF');
  const darkColor = rgbFromHex('#18171d');

  if (backgroundColor.startsWith('#')) {
    color = rgbFromHex(backgroundColor);
  } else if (backgroundColor.startsWith('rgba(')) {
    color = rgbFromString(backgroundColor, 5);
  } else if (backgroundColor.startsWith('rgb(')) {
    color = rgbFromString(backgroundColor, 4);
  }

  const luminance = relativeLuminance(color);
  const lightLuminance = relativeLuminance(lightColor);
  const darkLuminance = relativeLuminance(darkColor);

  const contrastLight = (lightLuminance + 0.05) / (luminance + 0.05);
  const contrastDark = (luminance + 0.05) / (darkLuminance + 0.05);

  // Using a default threshold contrast of 2.4 instead of 3
  // as this will solve weird color combinations in the mid tones
  return contrastLight >= contrastRatio || contrastLight > contrastDark
    ? labelColorOptions.light
    : labelColorOptions.dark;
}

export function getColorContrast(foreground, background) {
  // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
  const backgroundLuminance = relativeLuminance(rgbFromHex(background)) + 0.05;
  const foregroundLuminance = relativeLuminance(rgbFromHex(foreground)) + 0.05;

  let score = backgroundLuminance / foregroundLuminance;
  if (foregroundLuminance > backgroundLuminance) {
    score = 1 / score;
  }

  const level = CONTRAST_LEVELS.find(({ min, max }) => {
    return score >= min && score < max;
  });

  return {
    score: (Math.round(score * 10) / 10).toFixed(1),
    level,
  };
}

export function LightenColor(color, magnitude) {
  // Based of https://natclark.com/tutorials/javascript-lighten-darken-hex-color
  const hexColor = color.replace('#', '');

  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude; // eslint-disable-line no-bitwise
    r > 255 && (r = 255); // eslint-disable-line no-unused-expressions
    r < 0 && (r = 0); // eslint-disable-line no-unused-expressions
    let g = (decimalColor & 0x0000ff) + magnitude; // eslint-disable-line no-bitwise
    g > 255 && (g = 255); // eslint-disable-line no-unused-expressions
    g < 0 && (g = 0); // eslint-disable-line no-unused-expressions
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude; // eslint-disable-line no-bitwise
    b > 255 && (b = 255); // eslint-disable-line no-unused-expressions
    b < 0 && (b = 0); // eslint-disable-line no-unused-expressions
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`; // eslint-disable-line no-bitwise
  }

  return hexColor;
}

export function uid() {
  return Math.random().toString(36).substring(2);
}

/**
 * Receives an element and validates that it can be focused
 * @param { HTMLElement } The element we want to validate
 * @return { boolean } Is the element focusable
 */

export function isElementFocusable(elt) {
  if (!elt) return false;

  const { tagName } = elt;

  const isValidTag = focusableTags.includes(tagName);
  const hasValidType = elt.getAttribute('type') !== 'hidden';
  const isDisabled = elt.getAttribute('disabled') === '' || elt.getAttribute('disabled');
  const hasValidZIndex = elt.getAttribute('z-index') !== '-1';
  const isInvalidAnchorTag = tagName === 'A' && !elt.getAttribute('href');

  return isValidTag && hasValidType && !isDisabled && hasValidZIndex && !isInvalidAnchorTag;
}

/**
 * Receives an element and validates that it is reachable via sequential keyboard navigation
 * @param { HTMLElement } The element to validate
 * @return { boolean } Is the element focusable in a sequential tab order
 */

export function isElementTabbable(el) {
  if (!el) return false;

  const tabindex = parseInt(el.getAttribute('tabindex'), 10);
  return tabindex > -1;
}

/**
 * Receives an array of HTML elements and focus the first one possible
 * @param { Array.<HTMLElement> } An array of element to potentially focus
 * @return { undefined }
 */

export function focusFirstFocusableElement(elts) {
  const focusableElt = elts.find((el) => isElementFocusable(el));

  if (focusableElt) focusableElt.focus();
}

/**
 * Returns true if the current environment is considered a development environment (it's not
 * production or test).
 *
 * @returns {boolean}
 */
export function isDev() {
  return !['test', 'production'].includes(process.env.NODE_ENV);
}

/**
 * Prints a warning message to the console in non-test and non-production environments.
 * @param {string} message message to print to the console
 * @param {HTMLElement} element component that triggered the warning
 */
export function logWarning(message = '', element = '') {
  if (message.length && isDev()) {
    console.warn(message, element); // eslint-disable-line no-console
  }
}

/**
 * Stop default event handling and propagation
 */
export function stopEvent(
  event,
  { preventDefault = true, stopPropagation = true, stopImmediatePropagation = false } = {}
) {
  if (preventDefault) {
    event.preventDefault();
  }
  if (stopPropagation) {
    event.stopPropagation();
  }
  if (stopImmediatePropagation) {
    event.stopImmediatePropagation();
  }
}

/**
 * Return an Array of visible items
 */
export function filterVisible(els) {
  return (els || []).filter((el) => isVisible(el));
}
