import { shallowMount } from '@vue/test-utils';
import GlModal from '../../../base/modal/modal.vue';
import GlFormCheckbox from '../../../base/form/form_checkbox/form_checkbox.vue';
import GlFormCheckboxGroup from '../../../base/form/form_checkbox/form_checkbox_group.vue';
import GlFormTextarea from '../../../base/form/form_textarea/form_textarea.vue';
import FeedbackModal, { feedbackOptions } from './user_feedback_modal.vue';

const DummyComponent = {
  template: '<p>dummy</p>',
};

describe('FeedbackModal', () => {
  let wrapper;
  const findByTestId = (testId) => wrapper.find(`[data-testid="${testId}"]`);
  const findExtendedText = () => findByTestId('extended-text-feedback-textarea');
  const findImprovementSuggestion = () => findByTestId('improvement-suggestion-textarea');
  const findModal = () => wrapper.findComponent(GlModal);
  const findOptions = () => wrapper.findComponent('[data-testid="feedback-options"]');
  const findOptionsCheckboxes = () => findOptions().findAllComponents(GlFormCheckbox);
  const findTextarea = () => wrapper.findComponent(GlFormTextarea);
  const findSubmitButton = () => findByTestId('submit-button');
  const findCancelButton = () => findByTestId('cancel-button');
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

  it('renders the extendedFeedback textarea', () => {
    expect(findExtendedText().exists()).toBe(true);
  });

  it('renders the improvementSuggestion textarea', () => {
    expect(findImprovementSuggestion().exists()).toBe(true);
  });

  // todo fix this...
  describe('interaction', () => {
    it.only('emits the feedback event when the submit button is clicked', async () => {
      selectOption(); // Select an option to enable the submit button.
      await wrapper.vm.$nextTick(); // Wait for the DOM to update.
      let foo = findSubmitButton();
      debugger;
      findSubmitButton().trigger('click'); // Directly trigger click on the submit button.
      await wrapper.vm.$nextTick(); // Wait for any asynchronous updates.

      expect(wrapper.emitted('feedback-submitted')).toEqual([
        [
          {
            feedbackChoices: [feedbackOptions[0].value],
            extendedTextFeedback: '',
            improvementSuggestion: '',
          },
        ],
      ]);
    });
    // todo test if cancel closes the modal...
    // it('does not emit event if there is no option selected', () => {
    //   findModal().vm.$emit('primary');
    //   expect(wrapper.emitted('feedback-submitted')).toBeUndefined();
    // });

    // todo hides when button is canceld...
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

  describe('footer', () => {
    it('renders submit and cancel buttons', () => {
      expect(findSubmitButton().exists()).toBe(true);
      expect(findCancelButton().exists()).toBe(true);
    });

    it('disables the submit button when no options are selected', () => {
      // Assuming no option is selected by default
      expect(findSubmitButton().attributes('disabled')).toBe('true');
    });

    it('enables the submit button when an option is selected', async () => {
      selectOption(); // Helper function to select an option
      await wrapper.vm.$nextTick();
      expect(findSubmitButton().attributes('disabled')).toBeFalsy();
    });
  });
});
