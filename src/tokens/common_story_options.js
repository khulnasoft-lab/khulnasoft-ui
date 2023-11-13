import { colorFromBackground } from '../utils/utils';

export const methods = {
  getTokenName(name, key) {
    return [name, key].filter(Boolean).join('.');
  },
  getTextColorClass(value) {
    const textColorVariant = colorFromBackground(value, 4.5);
    return {
      'gl-text-gray-950': textColorVariant === 'dark',
      'gl-text-white': textColorVariant === 'light',
    };
  },
};

export const template = `
  <ul
    class="gl-list-style-none gl-m-0 gl-p-0"
  >
    <li
      v-for="(token, key) in tokens"
      :key="key"
      class="gl-display-flex gl-justify-content-space-between gl-gap-3 gl-p-3"
      :class="getTextColorClass(token.$value)"
      :style="{ backgroundColor: token.$value }"
    >
      <code class="gl-reset-color">{{ getTokenName(name, key) }}</code>
      <code class="gl-reset-color">{{ token.$value }}</code>
    </li>
  </ul>
`;
