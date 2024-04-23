import COMPILED_TOKENS from '../../dist/tokens/json/tokens.json';
import { createDesignTokenStory } from './common_story_options';

export const ThemeIndigo = createDesignTokenStory({ tokens: COMPILED_TOKENS.theme.indigo });

export const ThemeBlue = createDesignTokenStory({ tokens: COMPILED_TOKENS.theme.blue });

export const ThemeLightBlue = createDesignTokenStory({
  tokens: COMPILED_TOKENS.theme['light-blue'],
});

export const ThemeGreen = createDesignTokenStory({ tokens: COMPILED_TOKENS.theme.green });

export const ThemeRed = createDesignTokenStory({ tokens: COMPILED_TOKENS.theme.red });

export const ThemeLightRed = createDesignTokenStory({ tokens: COMPILED_TOKENS.theme['light-red'] });

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/themes/light',
};
