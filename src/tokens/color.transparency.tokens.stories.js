import COMPILED_TOKENS from '../../dist/tokens/json/tokens.json';
import { colorTokenStoryOptions } from './common_story_options';

const generateProps = ({ tokens = {} } = {}) => ({ tokens });

export const Gray = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
Gray.args = generateProps({ tokens: COMPILED_TOKENS['t-gray-a'] });

export const White = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: colorTokenStoryOptions.components,
  methods: colorTokenStoryOptions.methods,
  template: `<div class="gl-bg-gray-900 gl-text-white">${colorTokenStoryOptions.template}</div>`,
});
White.args = generateProps({ tokens: COMPILED_TOKENS['t-white-a'] });

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/transparency',
};
