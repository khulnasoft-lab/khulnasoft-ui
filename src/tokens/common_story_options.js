import { WHITE, GRAY_950 } from '../../dist/tokens/js/tokens';
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
      lightBackground: WHITE,
      darkBackground: GRAY_950,
    },
    template: `<tokens-story v-bind="$props" />`,
  });
  Story.args = { tokens };

  return Story;
};
