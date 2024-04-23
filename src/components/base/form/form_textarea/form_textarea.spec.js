import { mount } from '@vue/test-utils';
import lodashDebounce from 'lodash/debounce';
import GlFormTextarea from './form_textarea.vue';

jest.mock('lodash/debounce', () => jest.fn((fn) => fn));

const modelEvent = GlFormTextarea.model.event;
const newValue = 'foo';

describe('GlFormTextArea', () => {
  let wrapper;

  const createComponent = (propsData = {}) => {
    wrapper = mount(GlFormTextarea, {
      propsData,
      scopedSlots: {
        'character-count-text': function characterCountText({ count }) {
          return count === 1 ? `${count} character remaining` : `${count} characters remaining`;
        },
        'character-count-over-limit-text': function characterCountOverLimitText({ count }) {
          return count === 1 ? `${count} character over limit` : `${count} characters over limit`;
        },
      },
    });
  };

  const findTextarea = () => wrapper.find('textarea');

  const itUpdatesDebouncedScreenReaderText = (expectedText) => {
    it('updates debounced screen reader text', () => {
      expect(lodashDebounce).toHaveBeenCalledWith(expect.any(Function), 1000);
      expect(wrapper.find('[data-testid="character-count-text-sr-only"]').text()).toBe(
        expectedText
      );
    });
  };

  describe('v-model', () => {
    describe('value binding', () => {
      beforeEach(() => {
        createComponent({ value: 'initial' });
      });

      it(`sets the textarea's value`, () => {
        expect(findTextarea().element.value).toBe('initial');
      });

      describe('when the value prop changes', () => {
        beforeEach(() => {
          wrapper.setProps({ value: newValue });
          return wrapper.vm.$nextTick();
        });

        it(`updates the textarea's value`, () => {
          expect(findTextarea().element.value).toBe(newValue);
        });
      });
    });

    describe('event emission', () => {
      beforeEach(() => {
        createComponent();

        findTextarea().setValue(newValue);
      });

      it('synchronously emits update event', () => {
        expect(wrapper.emitted('update')).toEqual([[newValue]]);
      });

      it(`synchronously emits ${modelEvent} event`, () => {
        expect(wrapper.emitted(modelEvent)).toEqual([[newValue]]);
      });
    });
  });

  describe('debounce', () => {
    describe.each([10, 100, 1000])('given a debounce of %dms', (debounce) => {
      beforeEach(() => {
        jest.useFakeTimers();

        createComponent({ debounce });

        findTextarea().setValue(newValue);
      });

      it('synchronously emits an update event', () => {
        expect(wrapper.emitted('update')).toEqual([[newValue]]);
      });

      it(`emits a ${modelEvent} event after the debounce delay`, () => {
        // Just before debounce completes
        jest.advanceTimersByTime(debounce - 1);
        expect(wrapper.emitted(modelEvent)).toBe(undefined);

        // Exactly when debounce completes
        jest.advanceTimersByTime(1);
        expect(wrapper.emitted(modelEvent)).toEqual([[newValue]]);
      });
    });
  });

  describe('lazy', () => {
    beforeEach(() => {
      createComponent({ lazy: true });

      findTextarea().setValue(newValue);
    });

    it('synchronously emits an update event', () => {
      expect(wrapper.emitted('update')).toEqual([[newValue]]);
    });

    it.each(['change', 'blur'])('updates model after %s event', (event) => {
      expect(wrapper.emitted(modelEvent)).toBe(undefined);

      wrapper.trigger(event);

      expect(wrapper.emitted(modelEvent)).toEqual([[newValue]]);
    });
  });

  describe('submit on enter prop', () => {
    it('should be false by default', () => {
      createComponent({});

      wrapper.trigger('keyup.enter', {
        metaKey: true,
      });

      expect(wrapper.emitted('submit')).toBe(undefined);
    });

    it('should emit submit when cmd+enter is pressed', async () => {
      createComponent({ submitOnEnter: true });

      wrapper.trigger('keyup.enter', {
        metaKey: true,
      });

      expect(wrapper.emitted('submit')).toEqual([[]]);
    });
  });

  describe('when `characterCount` prop is set', () => {
    const characterCount = 10;

    describe('when textarea character count is under the max character count', () => {
      const textareaCharacterCount = 5;
      const expectedText = `${characterCount - textareaCharacterCount} characters remaining`;

      beforeEach(() => {
        createComponent({
          value: 'a'.repeat(textareaCharacterCount),
          characterCount,
        });
      });

      it('displays remaining characters', () => {
        expect(wrapper.text()).toContain(expectedText);
      });

      itUpdatesDebouncedScreenReaderText(expectedText);
    });

    describe('when textarea character count is over the max character count', () => {
      const textareaCharacterCount = 15;
      const expectedText = `${textareaCharacterCount - characterCount} characters over limit`;

      beforeEach(() => {
        createComponent({
          value: 'a'.repeat(textareaCharacterCount),
          characterCount,
        });
      });

      it('displays number of characters over', () => {
        expect(wrapper.text()).toContain(expectedText);
      });

      itUpdatesDebouncedScreenReaderText(expectedText);
    });

    describe('when textarea value is updated', () => {
      const textareaCharacterCount = 5;
      const newTextareaCharacterCount = textareaCharacterCount + 3;
      const expectedText = `${characterCount - newTextareaCharacterCount} characters remaining`;

      beforeEach(() => {
        createComponent({
          value: 'a'.repeat(textareaCharacterCount),
          characterCount,
        });

        wrapper.setProps({ value: 'a'.repeat(newTextareaCharacterCount) });
      });

      it('updates character count text', () => {
        expect(wrapper.text()).toContain(expectedText);
      });

      itUpdatesDebouncedScreenReaderText(expectedText);
    });

    describe('when `value` prop is `null`', () => {
      const expectedText = `${characterCount} characters remaining`;

      beforeEach(() => {
        createComponent({
          value: null,
          characterCount,
        });
      });

      it('displays remaining characters', () => {
        expect(wrapper.text()).toContain(expectedText);
      });

      itUpdatesDebouncedScreenReaderText(expectedText);
    });

    describe('when `value` prop is updated to `null`', () => {
      const textareaCharacterCount = 5;
      const expectedText = `${characterCount} characters remaining`;

      beforeEach(() => {
        createComponent({
          value: 'a'.repeat(textareaCharacterCount),
          characterCount,
        });

        wrapper.setProps({ value: null });
      });

      it('updates character count text', () => {
        expect(wrapper.text()).toContain(expectedText);
      });

      itUpdatesDebouncedScreenReaderText(expectedText);
    });
  });
});
