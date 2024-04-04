import { shallowMount } from '@vue/test-utils';
import GlModal from '../../../base/modal/modal.vue';
import GlAlert from '../../../base/alert/alert.vue';
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
  const findModal = () => wrapper.findComponent(GlModal);
  const findOptions = () => findByTestId('feedback-options');
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
      provide: options.injections,
    });

    wrapper.vm.close = jest.fn();
    return wrapper;
  };

  describe('inputs', () => {
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
  });

  describe('interaction', () => {
    beforeEach(() => {
      createComponent();
    });

    it('emits the feedback event when the submit button is clicked and closes the modal', () => {
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

      expect(wrapper.vm.close).toHaveBeenCalledTimes(1);
    });

    it('does not render validation error by default', () => {
      expect(findOptions().vm.$attrs.state).not.toBe(false);
    });

    it('renders validation error when submit was triggered without selected a required option', async () => {
      findModal().vm.$emit('primary');
      await wrapper.vm.$nextTick();

      expect(findOptions().vm.$attrs.state).toBe(false);
      expect(findOptions().vm.$attrs['invalid-feedback']).toBe('Select at least one option.');
      expect(wrapper.emitted('feedback-submitted')).toBeUndefined();
    });
  });

  describe('slots', () => {
    beforeEach(() => {
      createComponent();
    });

    it('renders the `feedback-extra-fields` slot with default content', () => {
      expect(wrapper.findComponent(DummyComponent).exists()).toBe(false);
      expect(findTextarea().exists()).toBe(true);
      wrapper.destroy();

      createComponent({ slots: { 'feedback-extra-fields': DummyComponent } });
      expect(wrapper.findComponent(DummyComponent).exists()).toBe(true);
      expect(findTextarea().exists()).toBe(false);
    });
  });

  describe('injections', () => {
    it('should pass modalTitle when set as injection', () => {
      const customTitle = 'Custom Feedback Title';
      createComponent({ injections: { modalTitle: customTitle } });
      expect(findModal().props('title')).toBe(customTitle);
    });

    it('should pass modalTitle default when injection not set', () => {
      createComponent();
      expect(findModal().props('title')).toBe('Give feedback on GitLab Duo');
    });

    it('should pass modalAlert when set as injection', () => {
      const customAlert = 'Custom Alert Message';
      createComponent({ injections: { modalAlert: customAlert } });
      expect(wrapper.findComponent(GlAlert).text()).toBe(customAlert);
    });

    it('should render modalAlert default when injection not set', () => {
      createComponent();
      expect(wrapper.findComponent(GlAlert).text()).toBe(
        'GitLab team members cannot see the AI content. Please be as descriptive as possible.'
      );
    });
  });
});
