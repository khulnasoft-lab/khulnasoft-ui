import { shallowMount } from '@vue/test-utils';
import { GlModal, GlFormCheckboxGroup, GlFormCheckbox, GlFormTextarea } from '../../../../index';
import FeedbackModal, { feedbackOptions } from './user_feedback_modal.vue';

const DummyComponent = {
  template: '<p>dummy</p>',
};

describe('FeedbackModal', () => {
  let wrapper;

  const findModal = () => wrapper.findComponent(GlModal);
  const findOptions = () => wrapper.findComponent('[data-testid="feedback-options"]');
  const findOptionsCheckboxes = () => findOptions().findAllComponents(GlFormCheckbox);
  const findTextarea = () => wrapper.findComponent(GlFormTextarea);
  const selectOption = (index = 0) => {
    wrapper
      .findAllComponents(GlFormCheckboxGroup)
      .at(index)
      .vm.$emit('input', [feedbackOptions[index].value]);
  };
  const createComponent = (options = {}) => {
    wrapper = shallowMount(FeedbackModal, {
      ...options,
      stubs: {
        GlModal,
        GlFormCheckboxGroup,
      },
    });
  };

  beforeEach(() => {
    createComponent();
  });

  it('renders the feedback options', () => {
    const checkboxes = findOptionsCheckboxes();
    feedbackOptions.forEach((option, index) => {
      expect(checkboxes.at(index).text()).toBe(option.text);
      expect(checkboxes.at(index).attributes('value')).toBe(option.value);
    });
  });

  it('renders the textarea field for additional feedback', () => {
    expect(findTextarea().exists()).toBe(true);
  });

  describe('interaction', () => {
    it('emits the feedback event when the submit button is clicked', () => {
      selectOption();
      findModal().vm.$emit('primary');
      expect(wrapper.emitted('feedback-submitted')).toEqual([
        [
          {
            feedbackChoices: [feedbackOptions[0].value],
            extendedTextFeedback: '',
          },
        ],
      ]);
    });
    it('does not emit event if there is no option selected', () => {
      findModal().vm.$emit('primary');
      expect(wrapper.emitted('feedback-submitted')).toBeUndefined();
    });
  });

  describe('slots', () => {
    it('renders the `feedback-extra-fields` slot with default content', () => {
      expect(wrapper.findComponent(DummyComponent).exists()).toBe(false);
      expect(findTextarea().exists()).toBe(true);
      wrapper.destroy();

      createComponent({ slots: { 'feedback-extra-fields': DummyComponent } });
      expect(wrapper.findComponent(DummyComponent).exists()).toBe(true);
      expect(findTextarea().exists()).toBe(false);
    });
  });
});
