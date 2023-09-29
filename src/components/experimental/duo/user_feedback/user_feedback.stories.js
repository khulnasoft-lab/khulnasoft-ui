import GlUserFeedback from './user_feedback.vue';
import readme from './user_feedback.md';

const generateProps = ({ feedbackLinkText, feedbackLinkUrl } = {}) => ({
  feedbackLinkText,
  feedbackLinkUrl,
});

const Template = (args, { argTypes }) => ({
  components: { GlUserFeedback },
  props: Object.keys(argTypes),
  data() {
    return {
      eventOutput: '',
    };
  },
  methods: {
    logEvent(event) {
      this.eventOutput = JSON.stringify(event);
    },
  },
  template: `
    <div>
      <gl-user-feedback
        :feedback-link-text="feedbackLinkText"
        :feedback-link-url="feedbackLinkUrl"
        @feedback="logEvent"/>
      <p v-if="eventOutput"><code>{{ eventOutput }}</code></p>
    </div>
    `,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'experimental/duo/user-feedback',
  component: GlUserFeedback,
  parameters: {
    storyshots: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
