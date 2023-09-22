import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import { GlButton } from '../../../../index';
import DuoChatFeedbackModal from './user_feedback_modal.vue';
import UserFeedback, { i18n } from './user_feedback.vue';

describe('UserFeedback', () => {
  let wrapper;
  const eventName = 'test_event_name';

  const createComponent = ({ props, data = {} } = {}) => {
    wrapper = shallowMount(UserFeedback, {
      data() {
        return data;
      },
      propsData: {
        eventName,
        ...props,
      },
    });
  };

  const findButton = () => wrapper.findComponent(GlButton);
  const findModal = () => wrapper.findComponent(DuoChatFeedbackModal);

  beforeEach(() => {
    createComponent();
  });

  describe('rendering with no feedback registered', () => {
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
      findModal().vm.$emit('feedback-submitted', passedFeedback);
      expect(wrapper.emitted('feedback')).toHaveLength(1);
    });

    it('renders the thank you text instead of a button', async () => {
      findModal().vm.$emit('feedback-submitted', passedFeedback);
      await nextTick();
      expect(findButton().exists()).toBe(false);
      expect(wrapper.text()).toContain(i18n.FEEDBACK_THANKS);
    });

    it('does not render the modal after feedback submitted', async () => {
      findModal().vm.$emit('feedback-submitted', passedFeedback);
      await nextTick();
      expect(findModal().exists()).toBe(false);
    });
  });
});
