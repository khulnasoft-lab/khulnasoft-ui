import COMPILED_TOKENS from '../../dist/tokens/json/tokens.json';
import { colorTokenStoryOptions } from './common_story_options';

const generateProps = ({ tokens = {} } = {}) => ({ tokens });

export const DataVizGreen = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
DataVizGreen.args = generateProps({ tokens: COMPILED_TOKENS['data-viz'].green });

export const DataVizAqua = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
DataVizAqua.args = generateProps({ tokens: COMPILED_TOKENS['data-viz'].aqua });

export const DataVizBlue = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
DataVizBlue.args = generateProps({ tokens: COMPILED_TOKENS['data-viz'].blue });

export const DataVizMagenta = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
DataVizMagenta.args = generateProps({ tokens: COMPILED_TOKENS['data-viz'].magenta });

export const DataVizOrange = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTokenStoryOptions,
});
DataVizOrange.args = generateProps({ tokens: COMPILED_TOKENS['data-viz'].orange });

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/data-viz/light',
};
