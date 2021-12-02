import { shallowMount } from '@vue/test-utils';
import SegmentedControl from './segmented_control.vue';

const DISABLED_VALUE = 'disabled-three';

describe('segmented control', () => {
  let wrapper;
  let consoleWarnSpy;

  const defaultProps = {
    options: [
      { value: 'disabled-zero', text: 'zero', disabled: true },
      { value: 'valid-one', text: 'one' },
      { value: 'valid-two', text: 'two' },
      { value: DISABLED_VALUE, text: 'three', disabled: true },
    ],
    checked: 'valid-one',
  };

  const createComponent = (propsData) => {
    const options = {
      propsData: {
        ...defaultProps,
        ...propsData,
      },
      shouldProxy: true,
    };

    wrapper = shallowMount(SegmentedControl, options);
  };

  beforeAll(() => {
    consoleWarnSpy = jest.spyOn(global.console, 'warn');
  });

  afterAll(() => {
    consoleWarnSpy.mockRestore();
  });

  beforeEach(() => {
    consoleWarnSpy.mockClear();
  });

  const warning = 'Segmented button should always have valid option selected';
  describe('with options and valid value', () => {
    beforeEach(() => {
      createComponent();
    });

    it('should not warn or emit', () => {
      expect(global.console.warn).not.toHaveBeenCalled();
      expect(Object.keys(wrapper.emitted)).toHaveLength(0);
    });
  });

  describe.each`
    checked                | desc
    ${'nonexistent-value'} | ${'non existent'}
    ${DISABLED_VALUE}      | ${'disabled'}
  `('with value $desc', ({ checked }) => {
    beforeEach(() => {
      createComponent({ checked });
    });

    it('should warn', () => {
      expect(global.console.warn).toHaveBeenCalledWith(warning);
    });

    it('should emit', () => {
      expect(wrapper.emitted('input')).toEqual([['valid-one']]);
    });
  });

  describe('with all options disabled', () => {
    beforeEach(() => {
      createComponent({
        options: [{ value: 'disabled', disabled: true }],
        checked: 'bogus',
      });
    });

    it('should not emit', () => {
      expect(Object.keys(wrapper.emitted())).toHaveLength(0);
    });
  });

  describe('when updated with bad value', () => {
    beforeEach(async () => {
      createComponent();
      wrapper.setProps({ checked: 'nonexistent-value' });
      await wrapper.vm.$nextTick();
    });

    it('should log warning', () => {
      expect(global.console.warn).toHaveBeenCalledWith(warning);
    });

    it('should emit value', () => {
      expect(wrapper.emitted('input')).toEqual([['valid-one']]);
    });
  });

  describe('when updated with bad options', () => {
    beforeEach(async () => {
      createComponent();
      wrapper.setProps({ options: [{ value: 'bogus' }] });
      await wrapper.vm.$nextTick();
    });

    it('should log warning', () => {
      expect(global.console.warn).toHaveBeenCalledWith(warning);
    });

    it('should emit value', () => {
      expect(wrapper.emitted('input')).toEqual([['bogus']]);
    });
  });

  describe('when updated with a invalid value we only emit values that are legitimate', () => {
    beforeEach(async () => {
      createComponent();
      wrapper.setProps({ checked: 'doomed-value' });
      await wrapper.vm.$nextTick();
      wrapper.setProps({ checked: 'doomed-value-2' });
    });

    it('should log warning', () => {
      expect(global.console.warn).toHaveBeenCalledWith(warning);
    });

    it('should only emit a legitimate value', () => {
      expect(wrapper.emitted('input')).toEqual([['valid-one'], ['valid-one']]);
    });
  });
});
