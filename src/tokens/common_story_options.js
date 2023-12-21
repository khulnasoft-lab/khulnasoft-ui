import { colorFromBackground, relativeLuminance, rgbFromHex } from '../utils/utils';
import { WHITE, GRAY_950 } from '../../dist/tokens/js/tokens';

const CONTRAST_LEVELS = [
  {
    grade: 'F',
    min: 0,
    max: 3,
  },
  {
    grade: 'AA+',
    min: 3,
    max: 4.5,
  },
  {
    grade: 'AA',
    min: 4.5,
    max: 7,
  },
  {
    grade: 'AAA',
    min: 7,
    max: 22,
  },
];

export const methods = {
  isAlpha(value) {
    return value.startsWith('rgba(');
  },
  getTokenName(name, key) {
    return [name, key].filter(Boolean).join('.');
  },
  getTextColorClass(value) {
    if (this.isAlpha(value)) return '';
    const textColorVariant = colorFromBackground(value, 4.5);
    return {
      'gl-text-gray-950': textColorVariant === 'dark',
      'gl-text-white': textColorVariant === 'light',
    };
  },
  getColorContrast(foreground = 'light', background) {
    const foregroundColor = {
      light: WHITE,
      dark: GRAY_950,
    };
    // Formula: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
    const foregroundLuminance = relativeLuminance(rgbFromHex(foregroundColor[foreground])) + 0.05;
    const backgroundLuminance = relativeLuminance(rgbFromHex(background)) + 0.05;

    let score = foregroundLuminance / backgroundLuminance;
    if (backgroundLuminance > foregroundLuminance) {
      score = 1 / score;
    }

    const level = CONTRAST_LEVELS.find(({ min, max }) => {
      return score >= min && score < max;
    });

    return {
      score: (Math.round(score * 10) / 10).toFixed(1),
      level,
    };
  },
  getColorContrastClass(foreground, background) {
    const { grade } = this.getColorContrast(foreground, background).level;
    const isFail = grade === 'F';
    const classes = {
      light: isFail ? 'gl-inset-border-1-red-500 gl-text-red-500' : 'gl-text-gray-950',
      dark: isFail ? 'gl-inset-border-1-red-300 gl-text-red-300' : 'gl-text-white',
    };
    return classes[foreground];
  },
};

export const template = `
  <ul
    class="gl-list-style-none gl-m-0 gl-p-0"
  >
    <li
      v-for="(token, key) in tokens"
      :key="key"
      class="gl-display-flex gl-flex-wrap gl-align-items-center gl-justify-content-space-between gl-gap-3 gl-p-3"
      :class="getTextColorClass(token.$value)"
      :style="{ backgroundColor: token.$value }"
    >
      <code class="gl-reset-color">{{ getTokenName(name, key) }}</code>
      <div class="gl-display-flex gl-align-items-center gl-gap-3">
        <code class="gl-reset-color">{{ token.$value }}</code>
        <code
          v-if="!isAlpha(token.$value)"
          class="gl-w-10 gl-text-center gl-rounded-base gl-font-xs gl-p-2 gl-bg-gray-900"
          :class="getColorContrastClass('dark', token.$value)"
        >
          {{ getColorContrast('dark', token.$value).level.grade }}
          {{ getColorContrast('dark', token.$value).score }}
        </code>
        <code
          v-if="!isAlpha(token.$value)"
          class="gl-w-10 gl-text-center gl-rounded-base gl-font-xs gl-p-2 gl-bg-white"
          :class="getColorContrastClass('light', token.$value)"
        >
          {{ getColorContrast('light', token.$value).level.grade }}
          {{ getColorContrast('light', token.$value).score }}
        </code>
      </div>
    </li>
  </ul>
`;
