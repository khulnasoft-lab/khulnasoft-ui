import { getEventLikeTimeStamp } from './get_event_like_time_stamp';

/**
 * Map<HTMLElement, { bindTimeStamp: number, callback: Function }>
 */
const callbacks = new Map();

/**
 * Is a global listener already set up?
 */
let listening = false;

const globalListener = (event) => {
  callbacks.forEach(({ bindTimeStamp, value }, element) => {
    const isObjectValue = typeof value !== 'function';
    const checkIgnored = isObjectValue && value.ignore && value.ignore.length;
    const callback = isObjectValue ? value.handler : value;
    if (
      // Ignore events that aren't targeted outside the element
      element.contains(event.target) ||
      // Only consider events triggered after the directive was bound
      event.timeStamp <= bindTimeStamp ||
      (checkIgnored && value.ignore.some((cb) => cb().contains(event.target)))
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
};

const startListening = () => {
  if (listening) {
    return;
  }

  document.addEventListener('click', globalListener, { capture: true });
  listening = true;
};

const stopListening = () => {
  if (!listening) {
    return;
  }

  document.removeEventListener('click', globalListener);
  listening = false;
};

const bind = (el, { value, arg = 'click' }) => {
  if (typeof value !== 'function' && typeof value !== 'object' && value) {
    throw new Error(
      `[GlOutsideDirective] Value must be a function or a non-empty object; got ${typeof value}!`
    );
  }

  if (typeof value === 'object' && !value.handler) {
    throw new Error(`[GlOutsideDirective] Missing 'handler' property in an object config`);
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
    value,
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
