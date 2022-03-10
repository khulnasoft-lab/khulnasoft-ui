import { mount } from '@vue/test-utils';
import GlDropdownItem from '../../dropdown/dropdown_item.vue';
import GlFormInput from '../form_input/form_input.vue';
import { tokenList, labelText } from './constants';
import GlFormCombobox from './form_combobox.vue';

const partialToken = 'do';
const partialTokenMatch = ['dog', 'dodo', 'komodo dragon'];
const unlistedToken = 'elephant';

const doTimes = (num, fn) => {
  for (let i = 0; i < num; i += 1) {
    fn();
  }
};

describe('GlFormCombobox', () => {
  let wrapper;

  const createComponent = () => {
    wrapper = mount({
      data() {
        return {
          inputVal: '',
          tokens: tokenList,
          labelText,
        };
      },
      components: { GlFormCombobox },
      template: `
        <div>
          <gl-form-combobox
            v-model="inputVal"
            :token-list="tokens"
            :labelText="labelText"
          />
        </div>
      `,
    });
  };

  // needs new selector now
  const findDropdown = () => wrapper.find('[data-testid="combobox-dropdown"]');
  const findDropdownOptions = () =>
    wrapper.findAllComponents(GlDropdownItem).wrappers.map((item) => item.text());
  const findInput = () => wrapper.findComponent(GlFormInput);
  const findInputValue = () => findInput().element.value;
  const setInput = (val) => findInput().setValue(val);
  const arrowDown = () => findInput().trigger('keydown.down');

  describe('match and filter functionality', () => {
    beforeEach(() => {
      createComponent();
    });

    it('is closed when the input is empty', () => {
      expect(findInput().isVisible()).toBe(true);
      expect(findInputValue()).toBe('');
      expect(findDropdown().isVisible()).toBe(false);
    });

    it('is open when the input text matches a token', async () => {
      await setInput(partialToken);
      expect(findDropdown().isVisible()).toBe(true);
    });

    it('shows partial matches at string start and mid-string', async () => {
      await setInput(partialToken);
      expect(findDropdown().isVisible()).toBe(true);
      expect(findDropdownOptions()).toEqual(partialTokenMatch);
    });

    it('is closed when the text does not match', async () => {
      await setInput(unlistedToken);
      expect(findDropdown().isVisible()).toBe(false);
    });
  });

  describe('keyboard navigation in dropdown', () => {
    beforeEach(() => {
      createComponent();
    });

    describe('on down arrow + enter', () => {
      it('selects the next item in the list and closes the dropdown', async () => {
        await setInput(partialToken);
        findInput().trigger('keydown.down');
        await findInput().trigger('keydown.enter');
        expect(findInputValue()).toBe(partialTokenMatch[0]);
      });

      it('loops to the top when it reaches the bottom', async () => {
        await setInput(partialToken);
        doTimes(findDropdownOptions().length + 1, arrowDown);
        await findInput().trigger('keydown.enter');
        expect(findInputValue()).toBe(partialTokenMatch[0]);
      });
    });

    describe('on up arrow + enter', () => {
      it('selects the previous item in the list and closes the dropdown', async () => {
        setInput(partialToken);

        await wrapper.vm.$nextTick();
        doTimes(3, arrowDown);
        findInput().trigger('keydown.up');
        findInput().trigger('keydown.enter');

        await wrapper.vm.$nextTick();
        expect(findInputValue()).toBe(partialTokenMatch[1]);
        expect(findDropdown().isVisible()).toBe(false);
      });

      it('loops to the bottom when it reaches the top', async () => {
        await setInput(partialToken);
        findInput().trigger('keydown.down');
        findInput().trigger('keydown.up');
        await findInput().trigger('keydown.enter');
        expect(findInputValue()).toBe(partialTokenMatch[partialTokenMatch.length - 1]);
      });
    });

    describe('on enter with no item highlighted', () => {
      it('does not select any item and closes the dropdown', async () => {
        await setInput(partialToken);
        await findInput().trigger('keydown.enter');
        expect(findInputValue()).toBe(partialToken);
        expect(findDropdown().isVisible()).toBe(false);
      });
    });

    describe('on click', () => {
      it('selects the clicked item regardless of arrow highlight', async () => {
        await setInput(partialToken);
        await wrapper.find('[data-testid="combobox-dropdown"] button').trigger('click');
        expect(findInputValue()).toBe(partialTokenMatch[0]);
      });
    });

    describe('on tab', () => {
      it('selects entered text, closes dropdown', async () => {
        await setInput(partialToken);
        findInput().trigger('keydown.tab');
        doTimes(2, arrowDown);

        await wrapper.vm.$nextTick();
        expect(findInputValue()).toBe(partialToken);
        expect(findDropdown().isVisible()).toBe(false);
      });
    });

    describe('on esc', () => {
      describe('when dropdown is open', () => {
        it('closes dropdown and does not select anything', async () => {
          await setInput(partialToken);
          await findInput().trigger('keydown.esc');
          expect(findInputValue()).toBe(partialToken);
          expect(findDropdown().isVisible()).toBe(false);
        });
      });

      describe('when dropdown is closed', () => {
        it('clears the input field', async () => {
          await setInput(unlistedToken);
          expect(findDropdown().isVisible()).toBe(false);
          await findInput().trigger('keydown.esc');
          expect(findInputValue()).toBe('');
        });
      });
    });
  });
});
