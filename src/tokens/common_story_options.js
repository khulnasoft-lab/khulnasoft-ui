import { GL_COLOR_WHITE, GL_COLOR_GRAY_950 } from '../../dist/tokens/js/tokens';
import TokensStory from './tokens_story.vue';

export const createDesignTokenStory = ({
  tokens = {},
  isBackgroundColorStory = true,
  containerClass = '',
} = {}) => {
  const Story = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
      TokensStory,
    },
    provide: {
      containerClass,
      isBackgroundColorStory,
      lightBackground: GL_COLOR_WHITE,
      darkBackground: GL_COLOR_GRAY_950,
    },
    template: `<tokens-story v-bind="$props" />`,
  });
  Story.args = { tokens };

  return Story;
};
