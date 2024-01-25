import COMPILED_TOKENS from '../../dist/tokens/json/tokens.json';
import { colorTokenStoryOptions } from './common_story_options';

const generateProps = ({ tokens = {} } = {}) => ({ tokens });

export const ThemeIndigo = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
ThemeIndigo.args = generateProps({ tokens: COMPILED_TOKENS.theme.indigo });

export const ThemeBlue = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
ThemeBlue.args = generateProps({ tokens: COMPILED_TOKENS.theme.blue });

export const ThemeLightBlue = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
ThemeLightBlue.args = generateProps({ tokens: COMPILED_TOKENS.theme['light-blue'] });

export const ThemeGreen = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
ThemeGreen.args = generateProps({ tokens: COMPILED_TOKENS.theme.green });

export const ThemeRed = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
ThemeRed.args = generateProps({ tokens: COMPILED_TOKENS.theme.red });

export const ThemeLightRed = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
ThemeLightRed.args = generateProps({ tokens: COMPILED_TOKENS.theme['light-red'] });

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/themes/light',
};
