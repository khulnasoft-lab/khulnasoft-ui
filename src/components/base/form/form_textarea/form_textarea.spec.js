import { mount } from '@vue/test-utils';
import GlFormTextarea from './form_textarea.vue';

const modelEvent = GlFormTextarea.model.event;
const newValue = 'foo';

describe('GlFormTextArea', () => {
  let wrapper;

  const createComponent = (propsData = {}) => {
    wrapper = mount(GlFormTextarea, {
      propsData,
    });
  };

  describe('v-model', () => {
    describe('value binding', () => {
      beforeEach(() => {
        createComponent({ value: 'initial' });
      });

      it(`sets the textarea's value`, () => {
        expect(wrapper.element.value).toBe('initial');
      });

      describe('when the value prop changes', () => {
        beforeEach(() => {
          wrapper.setProps({ value: newValue });
          return wrapper.vm.$nextTick();
        });

        it(`updates the textarea's value`, () => {
          expect(wrapper.element.value).toBe(newValue);
        });
      });
    });

    describe('event emission', () => {
      beforeEach(() => {
        createComponent();

        wrapper.setValue(newValue);
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

        wrapper.setValue(newValue);
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

      wrapper.setValue(newValue);
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
});
