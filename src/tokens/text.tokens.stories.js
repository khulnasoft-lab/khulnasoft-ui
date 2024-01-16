import COMPILED_TOKENS from '../../dist/tokens/json/tokens.json';
import { colorTextTokenStoryOptions } from './common_story_options';

const generateProps = ({ tokens = {} } = {}) => ({ tokens });

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  ...colorTextTokenStoryOptions,
});
Default.args = generateProps({ name: 'text', tokens: COMPILED_TOKENS.text });

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/text',
};
