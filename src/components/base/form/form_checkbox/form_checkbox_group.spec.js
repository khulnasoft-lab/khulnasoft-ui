import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import GlFormCheckboxGroup from './form_checkbox_group.vue';

describe('GlFormCheckboxGroup', () => {
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

  const createWrapper = (initialOptions = [firstOption, secondOption]) => {
    options = initialOptions;

    wrapper = mount({
      data() {
        return {
          selected: [firstOption.value],
          options,
        };
      },
      components: { GlFormCheckboxGroup },
      template: '<gl-form-checkbox-group v-model="selected" :options="options" />',
    });
  };

  const findCheckbox = (value) => wrapper.find(`input[type="checkbox"][value="${value}"]`);

  beforeEach(() => {
    createWrapper();
  });

  it('checks the checkbox correctly on mount', () => {
    const checkbox = findCheckbox(firstOption.value);
    expect(checkbox.element.checked).toBe(true);
  });

  it('supports legacy options format', () => {
    createWrapper(['one', 'two']);
    expect(wrapper.findAll('.gl-form-checkbox')).toHaveLength(2);
  });

  describe('when the selected value is changed programmatically', () => {
    beforeEach(() => {
      wrapper.vm.selected = [secondOption.value];
      return nextTick();
    });

    it('emits an input event, but not a change event', () => {
      expect(wrapper.findComponent(GlFormCheckboxGroup).emitted()).toEqual({
        input: [[[secondOption.value]]],
      });
    });

    it('checks the correct radio', () => {
      expect(findCheckbox(secondOption.value).element.checked).toBe(true);
    });
  });

  describe('when the selected value is changed by the user', () => {
    let checkbox;

    beforeEach(() => {
      checkbox = findCheckbox(secondOption.value);

      checkbox.trigger('click');
      return nextTick();
    });

    it('emits an input event and a change event', () => {
      expect(wrapper.findComponent(GlFormCheckboxGroup).emitted()).toEqual({
        input: [[[firstOption.value, secondOption.value]]],
        change: [[[firstOption.value, secondOption.value]]],
      });
    });

    it('updates the bound value', () => {
      expect(wrapper.vm.selected).toStrictEqual([firstOption.value, secondOption.value]);
    });

    it('checks the checkbox', () => {
      expect(checkbox.element.checked).toBe(true);
    });
  });
});
