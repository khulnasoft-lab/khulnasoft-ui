import throttle from 'lodash/throttle';

const SCRIM_CSS_AFTER = 'gl-scrim-after';
const SCRIM_CSS_BEFORE = 'gl-scrim-before';
const SCRIM_CSS_TRANSPARENT = 'gl-scrim-transparent';

export const SCRIM_POSITION = {
  BOTTOM: 'bottom',
  TOP: 'top',
  TOP_BOTTOM: 'top_bottom',
};

const CLASS_POSITION_MAP = {
  [SCRIM_POSITION.TOP]: SCRIM_CSS_BEFORE,
  [SCRIM_POSITION.BOTTOM]: SCRIM_CSS_AFTER,
  [SCRIM_POSITION.TOP_BOTTOM]: SCRIM_CSS_AFTER,
};

/**
 * Taking into account borders and extra spacing
 * @type {number}
 */
const SCROLL_THRESHOLD = 5;
let CLASS_TO_ADD = CLASS_POSITION_MAP[SCRIM_POSITION.BOTTOM];

/**
 * Check if scrollable container have been scrolled to bottom
 * @param el scrollable container
 * @returns {boolean}
 */
const isScrolledToBottom = (el) =>
  el.scrollHeight - el.offsetHeight - el.scrollTop < SCROLL_THRESHOLD;

/**
 * Check if scrolling is started and content
 * was scrolled beyond top border
 * @param el scrollable container
 * @returns {boolean}
 */
const isScrolledFromTop = (el) => {
  return el.scrollTop > SCROLL_THRESHOLD;
};

/**
 * Check if container has overflown content with scroll
 * @param el scrollable container
 * @returns {boolean}
 */
const hasVerticalScroll = (el) => el.scrollHeight > el.offsetHeight;

/**
 * Toggle scrim if bottom is reached
 * @param el scrollable container
 */
const watchBottomScrim = (el) => {
  if (isScrolledToBottom(el)) {
    el.classList.add(SCRIM_CSS_TRANSPARENT);
  } else if (hasVerticalScroll(el)) {
    el.classList.remove(SCRIM_CSS_TRANSPARENT);
  }
};

/**
 * Toggle scrim if scroll was started from top
 * @param el scrollable container
 */
const watchTopScrim = (el) => {
  if (isScrolledFromTop(el)) {
    el.classList.add(SCRIM_CSS_BEFORE);
  } else {
    el.classList.remove(SCRIM_CSS_BEFORE);
  }
};

const scrimEventListener = (el, position = SCRIM_POSITION.BOTTOM) => {
  switch (position) {
    case SCRIM_POSITION.BOTTOM:
      watchBottomScrim(el);
      break;
    case SCRIM_POSITION.TOP: {
      watchTopScrim(el);
      break;
    }
    case SCRIM_POSITION.TOP_BOTTOM: {
      watchTopScrim(el);
      watchBottomScrim(el);
      break;
    }
    default:
      watchBottomScrim(el);
      break;
  }
};

/**
 *
 * @param el scrollable container
 * @param position selected position for scrim
 */
const throttled = (el, position) => throttle(() => scrimEventListener(el, position), 1000);

const inserted = (el, { arg: position = SCRIM_POSITION.BOTTOM }) => {
  CLASS_TO_ADD = CLASS_POSITION_MAP[position];

  if (hasVerticalScroll(el)) {
    if (position === SCRIM_POSITION.BOTTOM || position === SCRIM_POSITION.TOP_BOTTOM) {
      el.classList.add(CLASS_TO_ADD);
    }
  }

  el.addEventListener('scroll', throttled(el, position));
};

const unbind = (el) => {
  CLASS_TO_ADD = SCRIM_CSS_AFTER;
  el.classList.remove(CLASS_TO_ADD);
  el.removeEventListener('scroll', throttled(el));
};

export const GlScrimDirective = {
  inserted,
  unbind,
};
