import GlMention from './mention.vue';
import readme from './mention.md';

const defaultValue = (prop) => GlMention.props[prop].default;

const generateProps = ({ isCurrentUser = defaultValue('isCurrentUser') } = {}) => ({
  isCurrentUser,
});

const makeStory =
  (options) =>
  (args, { argTypes }) => ({
    components: {
      GlMention,
    },
    props: Object.keys(argTypes),
    ...options,
  });

export const DefaultMention = makeStory({
  components: { GlMention },
  template: `
    <gl-mention
      :is-current-user="isCurrentUser"
    >
        @username
    </gl-mention>`,
});
DefaultMention.args = generateProps();

export default {
  title: 'base/links/mention',
  component: GlMention,
  parameters: {
    bootstrapComponent: 'b-link',
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
