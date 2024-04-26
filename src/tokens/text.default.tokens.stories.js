import COMPILED_TOKENS from '../../dist/tokens/json/tokens.json';
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

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/text/light',
};
