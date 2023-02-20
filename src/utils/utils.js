import { isVisible } from 'bootstrap-vue/src/utils/dom';
import { COMMA, labelColorOptions, focusableTags } from './constants';

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

export function colorFromBackground(backgroundColor) {
  let r;
  let g;
  let b;

  if (backgroundColor.startsWith('#')) {
    [r, g, b] = rgbFromHex(backgroundColor);
  } else if (backgroundColor.startsWith('rgba(')) {
    [r, g, b] = rgbFromString(backgroundColor, 5);
  } else if (backgroundColor.startsWith('rgb(')) {
    [r, g, b] = rgbFromString(backgroundColor, 4);
  }

  if (r + g + b <= 500) {
    return labelColorOptions.light;
  }
  return labelColorOptions.dark;
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
 */
export function logWarning(message = '') {
  if (message.length && isDev()) {
    console.warn(message); // eslint-disable-line no-console
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
  return (els || []).filter(isVisible);
}
