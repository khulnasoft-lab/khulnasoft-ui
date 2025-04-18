import { mount } from '@vue/test-utils';
import GlFormRadio from './form_radio.vue';

describe('GlFormRadio', () => {
  let wrapper;
  let options;
  let eventHandlers;

  const firstOption = {
    text: 'One',
    value: 'one',
  };
  const secondOption = {
    text: 'Two',
    value: 'two',
  };

  const createWrapper = () => {
    options = [firstOption, secondOption];
    eventHandlers = {
      input: jest.fn(),
      change: jest.fn(),
    };

    wrapper = mount({
      data() {
        return {
          selected: firstOption.value,
          options,
        };
      },
      components: { GlFormRadio },
      template: `
        <div>
          <gl-form-radio
            v-for="option in options"
            :key="option.value"
            v-model="selected"
            :value="option.value"
            @change="changeHandler"
            @input="inputHandler"
          >{{ option.text }}</gl-form-radio>
        </div>
      `,
      methods: {
        changeHandler: eventHandlers.change,
        inputHandler: eventHandlers.input,
      },
    });
  };

  const findRadio = (value) => wrapper.find(`input[type="radio"][value="${value}"]`);

  beforeEach(() => {
    createWrapper();
  });

  it('checks the radio button correctly on mount', () => {
    const radio = findRadio(firstOption.value);
    expect(radio.element.checked).toBe(true);
  });

  describe('when the selected value is changed programmatically', () => {
    beforeEach(() => {
      wrapper.vm.selected = secondOption.value;
    });

    it('emits an input event, but not a change event on each radio', () => {
      wrapper.findAllComponents(GlFormRadio).wrappers.forEach((radio) => {
        expect(radio.emitted()).toEqual({
          input: [[secondOption.value]],
        });
      });
    });

    it('checks the correct radio', () => {
      expect(findRadio(secondOption.value).element.checked).toBe(true);
    });
  });

  describe('when the selected value is changed by the user', () => {
    let radio;

    beforeEach(async () => {
      radio = findRadio(secondOption.value);

      // NOTE: We can't use "setChecked" here because
      // it sets value programmatically under the hood and this
      // does not pass value for the "change" event.
      await radio.trigger('click');
      await radio.trigger('change');
    });

    it('emits an input event on each radio, and a change event on the newly selected radio', () => {
      const { input, change } = eventHandlers;
      const { value: clickedRadioValue } = secondOption;

      // The input handler is called twice because each radio emits one input event.
      expect(input).toHaveBeenCalledTimes(2);
      expect(input).toHaveBeenNthCalledWith(1, clickedRadioValue);
      expect(input).toHaveBeenNthCalledWith(2, clickedRadioValue);

      // The change handler is only called once, since only the newly selected radio emits a change event.
      expect(change).toHaveBeenCalledTimes(1);
      expect(change).toHaveBeenCalledWith(clickedRadioValue);
    });

    it('updates the bound value', () => {
      expect(wrapper.vm.selected).toBe(secondOption.value);
    });

    it('checks the radio', () => {
      expect(radio.element.checked).toBe(true);
    });
  });
});
