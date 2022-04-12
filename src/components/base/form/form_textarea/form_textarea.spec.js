import { mount } from '@vue/test-utils';
import { textareaCountOptions } from '../../../../utils/constants';
import GlFormTextarea from './form_textarea.vue';

const modelEvent = GlFormTextarea.model.event;
const newValue = 'foo';

describe('GlFormTextArea', () => {
  let wrapper;
  let textarea;

  const createComponent = (propsData = {}) => {
    wrapper = mount(GlFormTextarea, {
      propsData,
    });
    textarea = wrapper.find('textarea');
  };

  describe('v-model', () => {
    describe('value binding', () => {
      beforeEach(() => {
        createComponent({ value: 'initial' });
      });

      it(`sets the textarea's value`, () => {
        expect(textarea.element.value).toBe('initial');
      });

      describe('when the value prop changes', () => {
        beforeEach(() => {
          wrapper.setProps({ value: newValue });
          return wrapper.vm.$nextTick();
        });

        it(`updates the textarea's value`, () => {
          expect(textarea.element.value).toBe(newValue);
        });
      });
    });

    describe('event emission', () => {
      beforeEach(() => {
        createComponent();

        textarea.setValue(newValue);
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

        textarea.setValue(newValue);
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

      textarea.setValue(newValue);
    });

    it('synchronously emits an update event', () => {
      expect(wrapper.emitted('update')).toEqual([[newValue]]);
    });

    it.each(['change', 'blur'])('updates model after %s event', (event) => {
      expect(wrapper.emitted(modelEvent)).toBe(undefined);

      textarea.trigger(event);

      expect(wrapper.emitted(modelEvent)).toEqual([[newValue]]);
    });
  });

  describe('submit on enter prop', () => {
    it('should be false by default', () => {
      createComponent({});

      textarea.trigger('keyup.enter', {
        metaKey: true,
      });

      expect(wrapper.emitted().submit).toBe(undefined);
    });

    it('should emit submit when cmd+enter is pressed', async () => {
      createComponent({ submitOnEnter: true });

      textarea.trigger('keyup.enter', {
        metaKey: true,
      });

      expect(wrapper.emitted().submit).toEqual([[]]);
    });
  });

  describe('count', () => {
    it('should be 0 by default', () => {
      createComponent({
        characterCountText: '%{count} characters left',
        characterCountOverLimitText: '%{count} characters over limit',
      });

      expect(wrapper.text()).not.toContain('characters left');
      expect(wrapper.text()).not.toContain('characters over limit');
    });

    it('should display the remaining characters when a count is provided', () => {
      createComponent({
        count: 400,
        characterCountText: '%{count} characters left',
        characterCountOverLimitText: '%{count} characters over limit',
      });

      expect(wrapper.text()).toContain('400 characters left');
    });

    it('should display the difference between the limit and the length of the value', () => {
      const value = 'hello';

      createComponent({
        value,
        count: 400,
        characterCountText: '%{count} characters left',
        characterCountOverLimitText: '%{count} characters over limit',
      });

      const { length } = value;

      expect(wrapper.text()).toContain(`${400 - length} characters left`);
    });

    it('should display the over limit text once over the limit', () => {
      const value = 'hello';
      const count = 4;

      createComponent({
        value,
        count,
        characterCountText: '%{count} characters left',
        characterCountOverLimitText: '%{count} characters over limit',
      });

      const diff = Math.abs(count - value.length);

      expect(wrapper.text()).toContain(`${diff} characters over limit`);
    });

    describe('max', () => {
      it('should display the text as grey when up to the limit', () => {
        const value = 'hello';
        const count = 5;

        createComponent({
          value,
          count,
          characterCountText: '%{count} characters left',
          characterCountOverLimitText: '%{count} characters over limit',
        });

        const small = wrapper.find('small');

        expect(small.classes()).toContain('gl-text-gray-500');
      });
      it('should display the text as danger when over the limit', () => {
        const value = 'hello';
        const count = 4;

        createComponent({
          value,
          count,
          characterCountText: '%{count} characters left',
          characterCountOverLimitText: '%{count} characters over limit',
        });

        const small = wrapper.find('small');

        expect(small.classes()).toContain('gl-text-red-500');
      });
    });
    describe('recommended', () => {
      it('should display the text as gray when over the limit', () => {
        const value = 'hello';
        const count = 4;

        createComponent({
          value,
          count,
          countType: textareaCountOptions.recommended,
          characterCountText: '%{count} characters left',
          characterCountOverLimitText: '%{count} characters over limit',
        });

        const small = wrapper.find('small');

        expect(small.classes()).toContain('gl-text-gray-500');
      });
    });
  });
});
