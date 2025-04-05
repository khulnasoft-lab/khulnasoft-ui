import { mount } from '@vue/test-utils';
import GlFormCheckbox from './form_checkbox.vue';

describe('GlFormCheckbox', () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(GlFormCheckbox, options);
  };

  it('can start checked', async () => {
    createComponent({
      propsData: {
        checked: 'checked_value',
        value: 'checked_value',
        name: 'foo',
      },
    });

    expect(wrapper.find('input[name="foo"]').element.checked).toBe(true);
  });
});
