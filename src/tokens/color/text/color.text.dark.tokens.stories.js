import COMPILED_TOKENS from '../../../../dist/tokens/json/tokens.dark.json';
import { createDesignTokenStory } from '../../common_story_options';

export const Default = createDesignTokenStory({
  containerClass: 'gl-bg-gray-950',
  tokens: COMPILED_TOKENS.color.text,
  isBackgroundColorStory: false,
});

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/text/dark',
};
