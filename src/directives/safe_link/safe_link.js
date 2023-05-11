import Vue from 'vue';
import { isSafeURL } from '../../utils/url_utils';

const isExternalURL = (target, hostname) => {
  return target === '_blank' && hostname !== window.location.hostname;
};

const secureRel = (rel) => {
  const rels = rel ? rel.trim().split(' ') : [];

  if (!rels.includes('noopener')) {
    rels.push('noopener');
  }
  if (!rels.includes('noreferrer')) {
    rels.push('noreferrer');
  }
  return rels.join(' ');
};

const transform = (el, { arg: { skipSanitization = false } = {} } = {}) => {
  if (skipSanitization) {
    return;
  }

  const { href, target, rel, hostname } = el;

  if (!isSafeURL(href)) {
    el.href = 'about:blank';
  }

  if (isExternalURL(target, hostname)) {
    el.rel = secureRel(rel);
  }
};

export const SafeLinkDirective = {
  inserted: transform,
  update: (...args) => {
    Vue.nextTick(() => {
      transform(...args);
    });
  },
};
