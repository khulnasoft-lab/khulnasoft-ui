import COMPILED_TOKENS from '../../../../dist/tokens/json/tokens.dark.json';
import { createDesignTokenStory } from '../../common_story_options';

export const Default = createDesignTokenStory({
  tokens: {
    white: COMPILED_TOKENS.color.white,
    black: COMPILED_TOKENS.color.black,
  },
});

export const Gray = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.gray });

export const Blue = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.blue });

export const Green = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.green });

export const Orange = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.orange });

export const Red = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.red });

export const Purple = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.purple });

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/base/dark',
};
