import COMPILED_TOKENS from '../../dist/tokens/json/tokens.dark.json';
import { colorTokenStoryOptions } from './common_story_options';

const generateProps = ({ tokens = {} } = {}) => ({ tokens });

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
Default.args = generateProps({
  tokens: {
    white: COMPILED_TOKENS.white,
    black: COMPILED_TOKENS.black,
  },
});

export const Gray = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
Gray.args = generateProps({ tokens: COMPILED_TOKENS.gray });

export const Blue = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
Blue.args = generateProps({ tokens: COMPILED_TOKENS.blue });

export const Green = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
Green.args = generateProps({ tokens: COMPILED_TOKENS.green });

export const Orange = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
Orange.args = generateProps({ tokens: COMPILED_TOKENS.orange });

export const Red = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
Red.args = generateProps({ tokens: COMPILED_TOKENS.red });

export const Purple = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
Purple.args = generateProps({ tokens: COMPILED_TOKENS.purple });

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/base/dark',
};
