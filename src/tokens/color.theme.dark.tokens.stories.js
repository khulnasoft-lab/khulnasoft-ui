import { methods, template } from './common_story_options';
import colorTokens from './color.theme.dark.tokens.json';

const generateProps = ({ name = '', tokens = colorTokens } = {}) => ({
  name,
  tokens,
});

export const ThemeIndigo = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods,
  template,
});
ThemeIndigo.args = generateProps({ name: 'theme.indigo', tokens: colorTokens.theme.indigo });

export const ThemeBlue = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods,
  template,
});
ThemeBlue.args = generateProps({ name: 'theme.blue', tokens: colorTokens.theme.blue });

export const ThemeLightBlue = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods,
  template,
});
ThemeLightBlue.args = generateProps({
  name: 'theme.light-blue',
  tokens: colorTokens.theme['light-blue'],
});

export const ThemeGreen = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods,
  template,
});
ThemeGreen.args = generateProps({ name: 'theme.green', tokens: colorTokens.theme.green });

export const ThemeRed = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods,
  template,
});
ThemeRed.args = generateProps({ name: 'theme.red', tokens: colorTokens.theme.red });

export const ThemeLightRed = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods,
  template,
});
ThemeLightRed.args = generateProps({
  name: 'theme.light-red',
  tokens: colorTokens.theme['light-red'],
});

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/themes/dark',
};
