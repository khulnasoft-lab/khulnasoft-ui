import COMPILED_TOKENS from './build/json/tokens.json';
import { createDesignTokenStory } from './common_story_options';

export const Indigo = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.theme.indigo });

export const Blue = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.theme.blue });

export const LightBlue = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color.theme['light-blue'],
});

export const Green = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.theme.green });

export const Red = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.theme.red });

export const LightRed = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color.theme['light-red'],
});

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/theme',
};
