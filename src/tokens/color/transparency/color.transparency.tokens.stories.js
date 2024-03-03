import COMPILED_TOKENS from '../../../../dist/tokens/json/tokens.json';
import { createDesignTokenStory } from '../../common_story_options';

export const Gray = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.transparency.gray });

export const White = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color.transparency.white,
  containerClass: 'gl-bg-gray-900 gl-text-white',
});

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/transparency',
};
