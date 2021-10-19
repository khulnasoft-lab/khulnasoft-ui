import isFunction from 'lodash/isFunction';

let observer = null;

export const GlResizeObserverDirective = {
  bind(el, { value: resizeHandler }) {
    if (!isFunction(resizeHandler)) {
      throw TypeError('directive value must be a function');
    }

    if (!observer) {
      // the observer instance is shared for performance reasons
      // more information: https://github.com/WICG/ResizeObserver/issues/59
      observer = new ResizeObserver((entries) => {
        entries.forEach((event) => {
          event.target.glResizeHandler(event);
        });
      });
    }

    el.glResizeHandler = resizeHandler;
    observer.observe(el);
  },
  unbind(el) {
    if (el.glResizeHandler) {
      delete el.glResizeHandler;
      observer?.unobserve(el);
    }
  },
};
