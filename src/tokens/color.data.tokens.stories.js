import COMPILED_TOKENS from './build/json/tokens.json';
import { createDesignTokenStory } from './common_story_options';

export const Green = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.data.green });

export const Aqua = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.data.aqua });

export const Blue = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.data.blue });

export const Magenta = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color.data.magenta,
});

export const Orange = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.data.orange });

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/data',
};
