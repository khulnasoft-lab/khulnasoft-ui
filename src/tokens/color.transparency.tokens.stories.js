import { methods, template } from './common_story_options';
import colorTokens from './color.transparency.tokens.json';

const generateProps = ({ name = '', tokens = colorTokens } = {}) => ({
  name,
  tokens,
});

export const Gray = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods,
  template,
});
Gray.args = generateProps({ name: 't-gray-a', tokens: colorTokens['t-gray-a'] });

export const White = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods,
  template: `<div class="gl-bg-gray-900 gl-text-white">${template}</div>`,
});
White.args = generateProps({ name: 't-white-a', tokens: colorTokens['t-white-a'] });

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/transparency',
};
