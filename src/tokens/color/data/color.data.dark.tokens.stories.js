import COMPILED_TOKENS from '../../../../dist/tokens/json/tokens.dark.json';
import { createDesignTokenStory } from '../../common_story_options';

export const DataVizGreen = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color.data.green,
});

export const DataVizAqua = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color.data.aqua,
});

export const DataVizBlue = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color.data.blue,
});

export const DataVizMagenta = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color.data.magenta,
});

export const DataVizOrange = createDesignTokenStory({
  tokens: COMPILED_TOKENS.color.data.orange,
});

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'tokens/color/data-viz/dark',
};
