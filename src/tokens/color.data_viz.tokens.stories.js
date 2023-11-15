import { methods, template } from './common_story_options';
import colorTokens from './color.data_viz.tokens.json';

const generateProps = ({ name = '', tokens = colorTokens } = {}) => ({
  name,
  tokens,
});

export const DataVizGreen = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods,
  template,
});
DataVizGreen.args = generateProps({
  name: 'data-viz.green',
  tokens: colorTokens['data-viz'].green,
});

export const DataVizAqua = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods,
  template,
});
DataVizAqua.args = generateProps({ name: 'data-viz.aqua', tokens: colorTokens['data-viz'].aqua });

export const DataVizBlue = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods,
  template,
});
DataVizBlue.args = generateProps({ name: 'data-viz.blue', tokens: colorTokens['data-viz'].blue });

export const DataVizMagenta = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods,
  template,
});
DataVizMagenta.args = generateProps({
  name: 'data-viz.magenta',
  tokens: colorTokens['data-viz'].magenta,
});

export const DataVizOrange = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods,
  template,
});
DataVizOrange.args = generateProps({
  name: 'data-viz.orange',
  tokens: colorTokens['data-viz'].orange,
});

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/data-viz',
};
