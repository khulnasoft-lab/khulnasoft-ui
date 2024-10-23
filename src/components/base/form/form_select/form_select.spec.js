import { mount } from '@vue/test-utils';
import { formStateOptions, formInputWidths } from '../../../../utils/constants';
import { formSelectOptions } from './constants';
import GlFormSelect from './form_select.vue';

const SELECT_WRAPPER_CLASS = 'gl-form-select-wrapper';
const DEFAULT_SELECT_CLASSES = ['gl-form-select', 'custom-select'];
const excludeDefaultNull = (values) => Object.values(values).filter((value) => value !== null);

describe('GlFormSelect', () => {
  let wrapper;

  const createComponent = (propsData = {}, mountFn = mount) => {
    wrapper = mountFn(GlFormSelect, {
      propsData,
    });
  };
  const findSelect = () => wrapper.find('.gl-form-select');

  describe('state prop', () => {
    it.each`
      state                       | expectedClasses
      ${formStateOptions.valid}   | ${['is-valid']}
      ${formStateOptions.invalid} | ${['is-invalid']}
      ${formStateOptions.default} | ${[]}
      ${undefined}                | ${[]}
    `('adds $expectedClass class for state $state', ({ state, expectedClasses }) => {
      createComponent({ state });

      expect(findSelect().classes().sort()).toEqual(
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
        [SELECT_WRAPPER_CLASS, `gl-form-select-${width}`].sort()
      );
    });

    it('does not add a width class if not given the width prop', () => {
      createComponent();

      expect(wrapper.classes()).toEqual([SELECT_WRAPPER_CLASS]);
    });

    it('does not add a width class if passed null', () => {
      createComponent({ width: null });

      expect(wrapper.classes()).toEqual([SELECT_WRAPPER_CLASS]);
    });
  });

  describe('selectClass prop', () => {
    const selectClass = 'select-class';
    const anotherClass = 'another-class';

    it.each`
      type        | selectClassProp
      ${'String'} | ${'select-class'}
      ${'Array'}  | ${['select-class']}
      ${'Object'} | ${{ [selectClass]: true, [anotherClass]: false }}
    `('adds class for select using $type', ({ selectClassProp }) => {
      createComponent({ selectClass: selectClassProp });

      expect(findSelect().classes()).toContain(selectClass);
      expect(findSelect().classes()).not.toContain(anotherClass);
    });

    it('does not add a select class if not given the prop', () => {
      createComponent();

      expect(findSelect().classes()).not.toContain(selectClass);
    });

    it('does not add a select class if passed null', () => {
      createComponent({ selectClass: null });

      expect(findSelect().classes()).not.toContain(selectClass);
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
