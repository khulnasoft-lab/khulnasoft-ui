import { mount, shallowMount } from '@vue/test-utils';
import { formInputWidths } from '../../../../utils/constants';
import { BFormInput } from '../../../../vendor/bootstrap-vue/src/components/form-input/form-input';
import GlFormInput from './form_input.vue';

const modelEvent = GlFormInput.model.event;
const newValue = 'foo';

describe('GlFormInput', () => {
  let wrapper;

  const createComponent = ({ propsData = {}, mountFn = shallowMount, attrs = {} } = {}) => {
    wrapper = mountFn(GlFormInput, {
      propsData,
      attrs,
    });
  };

  describe('width prop', () => {
    describe('when number is passed', () => {
      // Exclude the default null value
      const widths = Object.values(formInputWidths).filter(Boolean);

      it.each(widths)('adds correct class for width %s', (width) => {
        createComponent({ propsData: { width } });

        expect(wrapper.classes()).toEqual(['gl-form-input', `gl-form-input-${width}`]);
      });

      it('does not add a width class if not given the width prop', () => {
        createComponent();

        expect(wrapper.classes()).toEqual(['gl-form-input']);
      });

      it('does not add a width class if passed null', () => {
        createComponent({ propsData: { width: null } });

        expect(wrapper.classes()).toEqual(['gl-form-input']);
      });
    });

    describe('when object is passed', () => {
      describe('when `default` key is provided', () => {
        it('adds responsive CSS classes and base class', () => {
          createComponent({ propsData: { width: { default: 'md', md: 'lg', lg: 'xl' } } });

          expect(wrapper.classes()).toEqual([
            'gl-form-input',
            'gl-form-input-md',
            'gl-md-form-input-lg',
            'gl-lg-form-input-xl',
          ]);
        });
      });

      describe('when `default` key is not provided', () => {
        it('adds responsive CSS classes', () => {
          createComponent({ propsData: { width: { md: 'lg', lg: 'xl' } } });

          expect(wrapper.classes()).toEqual([
            'gl-form-input',
            'gl-md-form-input-lg',
            'gl-lg-form-input-xl',
          ]);
        });
      });
    });
  });

  describe('v-model', () => {
    beforeEach(() => {
      createComponent({ mountFn: mount });

      wrapper.setValue(newValue);
    });

    it('synchronously emits an update event', () => {
      expect(wrapper.emitted('update')).toEqual([[newValue]]);
    });

    it('synchronously updates model', () => {
      expect(wrapper.emitted(modelEvent)).toEqual([[newValue]]);
    });
  });

  describe('debounce', () => {
    describe.each([10, 100, 1000])('given a debounce of %dms', (debounce) => {
      beforeEach(() => {
        jest.useFakeTimers();

        createComponent({ propsData: { debounce }, mountFn: mount });

        wrapper.setValue(newValue);
      });

      it('synchronously emits an update event', () => {
        expect(wrapper.emitted('update')).toEqual([[newValue]]);
      });

      it('emits a model event after the debounce delay', () => {
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
      createComponent({ propsData: { lazy: true }, mountFn: mount });

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

  describe('when input type is `number`', () => {
    beforeEach(() => {
      createComponent({ attrs: { type: 'number' } });
    });

    it('sets `noWheel` prop to `true`', () => {
      expect(wrapper.findComponent(BFormInput).props('noWheel')).toBe(true);
    });
  });

  describe('when input type is not `number`', () => {
    beforeEach(() => {
      createComponent({ attrs: { type: 'text' } });
    });

    it('sets `noWheel` prop to `false`', () => {
      expect(wrapper.findComponent(BFormInput).props('noWheel')).toBe(false);
    });
  });
});
