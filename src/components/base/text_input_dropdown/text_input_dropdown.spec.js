import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { GlTextInputDropdownItemDirective } from '../../../index';
import GlClearIconButton from '../../shared_components/clear_icon_button/clear_icon_button.vue';
import GlDropdownItem from '../dropdown/dropdown_item.vue';
import GlTextInputDropdown from './text_input_dropdown.vue';

import { GROUPED_ITEMS } from './mock_data';

describe('GlTextInputDropdown', () => {
  let wrapper;

  const mockDefaultSlot = `
    <gl-dropdown-item>first</gl-dropdown-item>
    <gl-dropdown-item>second</gl-dropdown-item>
  `;

  const createComponent = (props) => {
    wrapper = mount(GlTextInputDropdown, {
      propsData: {
        items: GROUPED_ITEMS,
        ...props,
      },
      stubs: {
        GlDropdownItem,
      },
      directives: {
        GlTextInputDropdownItem: GlTextInputDropdownItemDirective,
      },
      slots: {
        default: mockDefaultSlot,
      },
    });
  };

  const findInput = () => wrapper.findComponent({ ref: 'input' });
  const setInputValue = (val) => findInput().setValue(val);
  const findTextClearButton = () => wrapper.findComponent(GlClearIconButton);

  describe('with no input value', () => {
    beforeEach(() => {
      createComponent();
    });

    it('renders the text input with no visible dropdown item', () => {
      expect(findInput().exists()).toBe(true);
    });

    it('does not have the clear button', () => {
      expect(findTextClearButton().exists()).toBe(false);
    });

    it('emits an update event when we set input value', async () => {
      await setInputValue('newText');
      expect(wrapper.emitted()).toEqual({
        'update:textValue': [['newText']],
      });
    });
  });

  describe('with input value', () => {
    beforeEach(() => {
      createComponent({ textValue: '' });
    });

    describe('on focus', () => {
      it('emits open event', async () => {
        await findInput().trigger('focus');
        await nextTick();
        expect(wrapper.emitted('open')).toBe([[true]]);
      });
    });
  });

  describe('clear button', () => {
    it('is not rendered when value is empty', () => {
      createComponent({ textValue: '' });
      expect(findTextClearButton().exists()).toBe(false);
    });

    it('is not rendered when it is disabled', () => {
      createComponent({ textValue: '', inputAttrs: { disabled: true } });

      expect(findTextClearButton().exists()).toBe(false);
    });

    it('is rendered when value is provided', () => {
      createComponent({ textValue: 'lo' });
      expect(findTextClearButton().exists()).toBe(true);
    });

    it('emits empty value when clicked', () => {
      createComponent({ textValue: 'lo' });
      findTextClearButton().vm.$emit('click', { stopPropagation: jest.fn() });

      expect(wrapper.emitted()).toEqual({
        'update:textValue': [['']],
      });
    });
  });
});
