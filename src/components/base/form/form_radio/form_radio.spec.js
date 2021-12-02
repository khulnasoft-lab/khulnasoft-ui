import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import GlFormRadio from './form_radio.vue';

describe('GlFormRadio', () => {
  let wrapper;
  let options;
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
          >{{ option.text }}</gl-form-radio>
        </div>
      `,
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
      return nextTick();
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

    beforeEach(() => {
      radio = findRadio(secondOption.value);

      radio.trigger('click');
      return nextTick();
    });

    it('emits an input event on each radio, and a change event on the newly selected radio', () => {
      const [formRadioOne, formRadioTwo] = wrapper.findAllComponents(GlFormRadio).wrappers;

      expect(formRadioOne.emitted()).toEqual({
        input: [[secondOption.value]],
      });

      expect(formRadioTwo.emitted()).toEqual({
        input: [[secondOption.value]],
        change: [[secondOption.value]],
      });
    });

    it('updates the bound value', () => {
      expect(wrapper.vm.selected).toBe(secondOption.value);
    });

    it('checks the radio', () => {
      expect(radio.element.checked).toBe(true);
    });
  });
});
