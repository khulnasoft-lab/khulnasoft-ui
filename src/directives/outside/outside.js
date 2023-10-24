import { getEventLikeTimeStamp } from './get_event_like_time_stamp';

/**
 * Map<HTMLElement, { bindTimeStamp: number, callback: Function }>
 */
const callbacks = new Map();

/**
 * Is a global listener already set up?
 */
let listening = false;
let lastMousedown = null;

const globalListener = (event) => {
  callbacks.forEach(({ bindTimeStamp, callback }, element) => {
    const originalEvent = lastMousedown || event;
    if (
      // Ignore events that aren't targeted outside the element
      element.contains(originalEvent.target) ||
      // Only consider events triggered after the directive was bound
      event.timeStamp <= bindTimeStamp
    ) {
      return;
    }

    try {
      callback(event);
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
  });
  lastMousedown = null;
};

// We need to listen for mouse events because text selection fires click event only when selection ends.
// This means that the click event target could differ from the element where it originally started.
// As example: if we use mouse events we could guarantee that selecting text within a dropdown won't close it.
const onMousedown = (event) => {
  lastMousedown = event;
};

const startListening = () => {
  if (listening) {
    return;
  }

  document.addEventListener('mousedown', onMousedown);
  document.addEventListener('click', globalListener, { capture: true });
  listening = true;
  lastMousedown = null;
};

const stopListening = () => {
  if (!listening) {
    return;
  }

  document.removeEventListener('mousedown', onMousedown);
  document.removeEventListener('click', globalListener);
  listening = false;
};

const bind = (el, { value, arg = 'click' }) => {
  if (typeof value !== 'function') {
    throw new Error(`[GlOutsideDirective] Value must be a function; got ${typeof value}!`);
  }

  if (arg !== 'click') {
    throw new Error(
      `[GlOutsideDirective] Cannot bind ${arg} events; only click events are currently supported!`
    );
  }

  if (callbacks.has(el)) {
    // This element is already bound. This is possible if two components, which
    // share the same root node, (i.e., one is a higher-order component
    // wrapping another) _both_ have this directive applied.
    //
    // Because Vue binds directives in the direction towards the root, only the
    // deepest instance of this directive will be bound.
    //
    // A future iteration may add support for binding all instances on a given
    // element.
    return;
  }

  if (!listening) {
    startListening();
  }

  callbacks.set(el, {
    bindTimeStamp: getEventLikeTimeStamp(),
    callback: value,
  });
};

const unbind = (el) => {
  callbacks.delete(el);

  if (callbacks.size === 0) {
    stopListening();
  }
};

export const OutsideDirective = {
  bind,
  unbind,
};
