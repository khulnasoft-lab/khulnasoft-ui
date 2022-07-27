import { sanitize } from 'dompurify';
import { config as globalConfig } from '../../config';
import { forbiddenDataAttrs, newForbiddenDataAttrs } from './constants';

// Mitigate against future dompurify mXSS bypasses by
// avoiding additional serialize/parse round trip.
// See https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/1782
// and https://gitlab.com/gitlab-org/gitlab-ui/-/merge_requests/2127
// for more details.
const defaultConfig = () => ({
  RETURN_DOM_FRAGMENT: true,
  ALLOW_UNKNOWN_PROTOCOLS: true,
  FORBID_ATTR: globalConfig.newSafeHtmlAttrs ? [...newForbiddenDataAttrs] : [...forbiddenDataAttrs],
});

const transform = (el, binding) => {
  if (binding.oldValue !== binding.value) {
    const config = { ...defaultConfig(), ...(binding.arg ?? {}) };

    el.textContent = '';
    el.appendChild(sanitize(binding.value, config));
  }
};

export const SafeHtmlDirective = {
  bind: transform,
  update: transform,
};
