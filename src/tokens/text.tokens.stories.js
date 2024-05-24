import COMPILED_TOKENS from './build/json/tokens.json';
import COMPILED_TOKENS_DARK from './build/json/tokens.dark.json';
import { createDesignTokenStory } from './common_story_options';

export const Default = createDesignTokenStory({
  tokens: {
    primary: COMPILED_TOKENS.text.primary,
    secondary: COMPILED_TOKENS.text.secondary,
    tertiary: COMPILED_TOKENS.text.tertiary,
    ...COMPILED_TOKENS.text.color,
  },
  isBackgroundColorStory: false,
});

export const Dark = createDesignTokenStory({
  containerClass: 'gl-bg-gray-950',
  tokens: {
    primary: COMPILED_TOKENS_DARK.text.primary,
    secondary: COMPILED_TOKENS_DARK.text.secondary,
    tertiary: COMPILED_TOKENS_DARK.text.tertiary,
    ...COMPILED_TOKENS_DARK.text.color,
  },
  isBackgroundColorStory: false,
});

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/text',
};
