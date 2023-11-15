import { methods, template } from './common_story_options';
import colorTokens from './color.dark.tokens.json';

const generateProps = ({ name = '', tokens = colorTokens } = {}) => ({
  name,
  tokens,
});

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods,
  template,
});
Default.args = generateProps({
  tokens: {
    white: colorTokens.white,
    black: colorTokens.black,
  },
});

export const Gray = (args, { argTypes }) => ({ props: Object.keys(argTypes), methods, template });
Gray.args = generateProps({ name: 'gray', tokens: colorTokens.gray });

export const Blue = (args, { argTypes }) => ({ props: Object.keys(argTypes), methods, template });
Blue.args = generateProps({ name: 'blue', tokens: colorTokens.blue });

export const Green = (args, { argTypes }) => ({ props: Object.keys(argTypes), methods, template });
Green.args = generateProps({ name: 'green', tokens: colorTokens.green });

export const Orange = (args, { argTypes }) => ({ props: Object.keys(argTypes), methods, template });
Orange.args = generateProps({ name: 'orange', tokens: colorTokens.orange });

export const Red = (args, { argTypes }) => ({ props: Object.keys(argTypes), methods, template });
Red.args = generateProps({ name: 'red', tokens: colorTokens.red });

export const Purple = (args, { argTypes }) => ({ props: Object.keys(argTypes), methods, template });
Purple.args = generateProps({ name: 'purple', tokens: colorTokens.purple });

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/base/dark',
};
