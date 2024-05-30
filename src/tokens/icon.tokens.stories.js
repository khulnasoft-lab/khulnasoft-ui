import COMPILED_TOKENS from '../../dist/tokens/json/tokens.json';
import COMPILED_TOKENS_DARK from '../../dist/tokens/json/tokens.dark.json';
import { createDesignTokenStory } from './common_story_options';

export const Default = createDesignTokenStory({
  tokens: COMPILED_TOKENS.icon.color,
  isBackgroundColorStory: false,
});

export const Dark = createDesignTokenStory({
  containerClass: 'gl-bg-gray-950',
  tokens: COMPILED_TOKENS_DARK.icon.color,
  isBackgroundColorStory: false,
});

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/icon',
};
