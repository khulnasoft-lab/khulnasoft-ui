/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import { shallowMount } from '@vue/test-utils';
import GlAlert from '../../../base/alert/alert.vue';
import GlButton from '../../../base/button/button.vue';
import FeedbackModal from './user_feedback_modal.vue';
import UserFeedback, { i18n } from './user_feedback.vue';

const DummyComponent = {
  template: '<p>dummy</p>',
};

describe('UserFeedback', () => {
  let wrapper;
  const eventName = 'test_event_name';

  const createComponent = ({ props, data = {}, slots = {} } = {}) => {
    wrapper = shallowMount(UserFeedback, {
      data() {
        return data;
      },
      propsData: {
        eventName,
        ...props,
      },
      stubs: {
        FeedbackModal,
      },
      slots,
    });
  };

  const findAlert = () => wrapper.findComponent(GlAlert);
  const findButton = () => wrapper.findComponent(GlButton);
  const findModal = () => wrapper.findComponent(FeedbackModal);

  describe('rendering with no feedback registered', () => {
    beforeEach(() => {
      createComponent();
    });

    it('renders a button to provide feedback', () => {
      expect(findButton().exists()).toBe(true);
    });

    it('renders the feedback modal', () => {
      expect(findModal().exists()).toBe(true);
    });
  });

  it.each`
    feedbackLinkText | expectedButtonText
    ${'Foo'}         | ${'Foo'}
    ${undefined}     | ${i18n.FEEDBACK_LINK_TEXT}
  `(
    'renders "$expectedButtonText" as button text when "$feedbackLinkText" is passed as the feedback link text',
    ({ feedbackLinkText, expectedButtonText } = {}) => {
      createComponent({ props: { feedbackLinkText } });
      expect(findButton().text()).toBe(expectedButtonText);
    }
  );

  it('does not render the modal if custom URL is passed for the feedback link', () => {
    const feedbackLinkUrl = 'https://example.com';
    createComponent({ props: { feedbackLinkUrl } });
    expect(findButton().attributes('href')).toBe(feedbackLinkUrl);
    expect(findModal().exists()).toBe(false);
  });

  describe('event handling', () => {
    const passedFeedback = { feedbackOptions: ['helpful'], extendedFeedback: 'Foo bar' };

    it('emits the event, containing the form data, when modal emits', () => {
      createComponent();
      findModal().vm.$emit('feedback-submitted', passedFeedback);
      expect(wrapper.emitted('feedback')).toHaveLength(1);
    });

    it('renders the thank you alert instead of a button', async () => {
      createComponent({ props: { feedbackReceived: true } });

      expect(findButton().exists()).toBe(false);
      expect(findAlert().exists()).toBe(true);
      expect(findAlert().text()).toContain(i18n.FEEDBACK_THANKS);
    });

    it('does not render the modal after feedback submitted', async () => {
      createComponent({ props: { feedbackReceived: true } });
      expect(findModal().exists()).toBe(false);
    });
  });

  describe('slots', () => {
    beforeEach(() => {
      createComponent();
    });

    it('renders the `feedback-extra-fields` slot', () => {
      expect(wrapper.findComponent(DummyComponent).exists()).toBe(false);
      wrapper.destroy();
      createComponent({ slots: { 'feedback-extra-fields': DummyComponent } });
      expect(wrapper.findComponent(DummyComponent).exists()).toBe(true);
    });
  });
});
