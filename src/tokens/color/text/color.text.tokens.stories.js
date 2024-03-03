import COMPILED_TOKENS from '../../../../dist/tokens/json/tokens.json';
import { createDesignTokenStory } from '../../common_story_options';

export const Default = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color.text,
  isBackgroundColorStory: false,
});

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/text/light',
};
