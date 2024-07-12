import COMPILED_TOKENS from './build/json/tokens.json';
import { createDesignTokenStory } from './common_story_options';

export const Dark = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.alpha.dark });

export const Light = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color.alpha.light,
  containerClass: 'gl-bg-gray-900 gl-text-white',
});

export const Blue = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.alpha.blue });

export const Red = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.alpha.red });

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/alpha',
};
