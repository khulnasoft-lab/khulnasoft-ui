import COMPILED_TOKENS from '../../dist/tokens/json/tokens.json';
import { createDesignTokenStory } from './common_story_options';

export const Neutral = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.neutral });

export const Blue = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.blue });

export const Green = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.green });

export const Orange = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.orange });

export const Red = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.red });

export const Purple = createDesignTokenStory({ tokens: COMPILED_TOKENS.color.purple });

export const ThemeIndigo = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color['theme-indigo'],
});

export const ThemeBlue = createDesignTokenStory({ tokens: COMPILED_TOKENS.color['theme-blue'] });

export const ThemeLightBlue = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color['theme-light-blue'],
});

export const ThemeGreen = createDesignTokenStory({ tokens: COMPILED_TOKENS.color['theme-green'] });

export const ThemeRed = createDesignTokenStory({ tokens: COMPILED_TOKENS.color['theme-red'] });

export const ThemeLightRed = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color['theme-light-red'],
});

export const Brand = createDesignTokenStory({
  tokens: {
    white: COMPILED_TOKENS.color['brand-white'],
    charcoal: COMPILED_TOKENS.color['brand-charcoal'],
  },
});

export const BrandOrange = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color['brand-orange'],
});

export const BrandPurple = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color['brand-purple'],
});

export const BrandGray = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color['brand-gray'],
});

export const BrandPink = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color['brand-pink'],
});

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/constant',
};
