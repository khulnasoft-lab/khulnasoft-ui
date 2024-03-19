import GlAlert from '../../../base/alert/alert.vue';
import GlFormGroup from '../../../base/form/form_group/form_group.vue';
import GlFormTextarea from '../../../base/form/form_textarea/form_textarea.vue';
import GlDuoUserFeedback from './user_feedback.vue';
import readme from './user_feedback.md';

const generateProps = ({ feedbackLinkText, feedbackLinkUrl } = {}) => ({
  feedbackLinkText,
  feedbackLinkUrl,
});

export const Default = (args, { argTypes }) => ({
  components: {
    GlDuoUserFeedback,
    GlAlert,
    GlFormGroup,
    GlFormTextarea,
  },
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
      <gl-duo-user-feedback
        :feedback-link-text="feedbackLinkText"
        :feedback-link-url="feedbackLinkUrl"
        @feedback="logEvent"/>
      <p v-if="eventOutput"><code>{{ eventOutput }}</code></p>
    </div>
    `,
});
Default.args = generateProps();

export const Slots = (args, { argTypes }) => ({
  components: {
    GlDuoUserFeedback,
    GlAlert,
    GlFormGroup,
    GlFormTextarea,
  },
  props: Object.keys(argTypes),
  data() {
    return {
      eventOutput: '',
      didWhat: '',
      expectedWhat: '',
      improveWhat: '',
    };
  },
  methods: {
    logEvent(event) {
      const { feedbackChoices } = event;
      this.eventOutput = JSON.stringify({
        feedbackChoices,
        didWhat: this.didWhat,
        expectedWhat: this.expectedWhat,
        improveWhat: this.improveWhat,
      });
    },
  },
  template: `
    <div>
      <gl-duo-user-feedback
        :feedback-link-text="feedbackLinkText"
        :feedback-link-url="feedbackLinkUrl"
        @feedback="logEvent">
        <template #feedback-extra-fields>
          <div class="gl-mb-5">
              Example slot content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <gl-form-group label="What were you doing?" optional>
            <gl-form-textarea placeholder="The situation in which you interacted with GitLab Duo Chat." v-model="didWhat" />
          </gl-form-group>
          <gl-form-group label="What were you expecting from the response?" optional>
            <gl-form-textarea placeholder="What kind of information or assistance were you hoping to receive?" v-model="expectedWhat" />
          </gl-form-group>
          <gl-form-group label="How could the response be improved?" optional>
            <gl-form-textarea placeholder="How the response might better meet your needs."v-model="improveWhat" />
          </gl-form-group>
        </template>
      </gl-duo-user-feedback>
      <p v-if="eventOutput"><code>{{ eventOutput }}</code></p>
    </div>
    `,
});
Slots.parameters = { controls: { disable: true } };

export default {
  title: 'experimental/duo/duo-user-feedback',
  component: GlDuoUserFeedback,
  tags: ['skip-visual-test'],
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
