import { mount } from '@vue/test-utils';
import { formStateOptions, formInputWidths } from '../../../../utils/constants';
import { formSelectOptions } from './constants';
import GlFormSelect from './form_select.vue';

const DEFAULT_SELECT_CLASSES = ['gl-form-select', 'custom-select'];
const excludeDefaultNull = (values) => Object.values(values).filter((value) => value !== null);

describe('GlFormSelect', () => {
  let wrapper;

  const createComponent = (propsData = {}, mountFn = mount) => {
    wrapper = mountFn(GlFormSelect, {
      propsData,
    });
  };

  describe('state prop', () => {
    it.each`
      state                       | expectedClasses
      ${formStateOptions.valid}   | ${['is-valid']}
      ${formStateOptions.invalid} | ${['is-invalid']}
      ${formStateOptions.default} | ${[]}
      ${undefined}                | ${[]}
    `('adds $expectedClass class for state $state', ({ state, expectedClasses }) => {
      createComponent({ state });

      expect(wrapper.classes().sort()).toEqual(
        [...DEFAULT_SELECT_CLASSES, ...expectedClasses].sort()
      );
    });
  });

  describe('width prop', () => {
    // Exclude the default null value
    const nonNullWidths = excludeDefaultNull(formInputWidths);

    it.each(nonNullWidths)('adds correct class for width %s', (width) => {
      createComponent({ width });

      expect(wrapper.classes().sort()).toEqual(
        [...DEFAULT_SELECT_CLASSES, `gl-form-select-${width}`].sort()
      );
    });

    it('does not add a width class if not given the width prop', () => {
      createComponent();

      expect(wrapper.classes().sort()).toEqual([...DEFAULT_SELECT_CLASSES].sort());
    });

    it('does not add a width class if passed null', () => {
      createComponent({ width: null });

      expect(wrapper.classes().sort()).toEqual([...DEFAULT_SELECT_CLASSES].sort());
    });
  });

  describe('v-model', () => {
    it('should select an option element and update the v-model bound data', async () => {
      createComponent({ options: formSelectOptions });
      const options = wrapper.findAll('option');

      await options.at(1).setSelected();

      expect(wrapper.find('option:checked').element.value).toBe(formSelectOptions[1].value);
    });
  });
});
