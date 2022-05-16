import { shallowMount } from '@vue/test-utils';
import { BFormGroup } from 'bootstrap-vue';
import GlFormGroup from './form_group.vue';

describe('Form group component', () => {
  let wrapper;
  const testLabelClass = 'test-label-class';

  const findByTestId = (testId) => wrapper.find(`[data-testid="${testId}"]`);

  const findLabel = () => wrapper.find(`.${testLabelClass}`);
  const findLabelDescription = () => findByTestId('label-description');
  const findOptionalLabel = () => findByTestId('optional-label');

  const createComponent = (options) => {
    wrapper = shallowMount(GlFormGroup, {
      ...options,
    });
  };

  it.each`
    labelClass                      | expectedProp
    ${'additional-class'}           | ${'additional-class col-form-label'}
    ${['additional-class']}         | ${['additional-class', 'col-form-label']}
    ${{ 'additional-class': true }} | ${{ 'additional-class': true, 'col-form-label': true }}
    ${undefined}                    | ${'col-form-label'}
  `(
    'computed label class is $expectedProp when labelClass is $labelClass',
    ({ labelClass, expectedProp }) => {
      createComponent({
        propsData: {
          labelClass,
        },
      });

      expect(wrapper.findComponent(BFormGroup).props('labelClass')).toEqual(expectedProp);
    }
  );

  describe('label-description slot', () => {
    const labelDescriptionFromPropOptions = {
      propsData: { labelDescription: 'label-description from props' },
    };
    const labelDescriptionFromSlotOptions = {
      slots: { 'label-description': 'label-description from slots' },
    };

    it.each`
      labelDescriptionFrom | options
      ${'prop'}            | ${labelDescriptionFromPropOptions}
      ${'prop'}            | ${labelDescriptionFromPropOptions}
      ${'slot'}            | ${labelDescriptionFromSlotOptions}
      ${'slot'}            | ${labelDescriptionFromSlotOptions}
    `(
      'when label-description is provided from $labelDescriptionFrom',
      ({ labelDescriptionFrom, options }) => {
        createComponent({
          ...options,
        });

        expect(findLabelDescription().text()).toContain(
          `label-description from ${labelDescriptionFrom}`
        );
      }
    );
  });

  describe('label slot', () => {
    const customOptionalText = '(not required)';
    const labelFromPropOptions = {
      propsData: { label: 'label from props' },
      stubs: {
        BFormGroup,
      },
    };
    const labelFromSlotOptions = {
      slots: { label: 'label from slots' },
      stubs: {
        BFormGroup,
      },
    };
    const emptyLabelFromPropOptions = {
      propsData: { label: '' },
      stubs: {
        BFormGroup,
      },
    };
    const emptyLabelFromSlotOptions = {
      slots: { label: '' },
      stubs: {
        BFormGroup,
      },
    };
    const noLabel = {
      stubs: {
        BFormGroup,
      },
    };

    it.each`
      labelFrom               | options                      | optional | optionalText          | expectedOptional
      ${'provided from prop'} | ${labelFromPropOptions}      | ${true}  | ${undefined}          | ${true}
      ${'provided from prop'} | ${labelFromPropOptions}      | ${false} | ${undefined}          | ${false}
      ${'provided from slot'} | ${labelFromSlotOptions}      | ${true}  | ${undefined}          | ${false}
      ${'provided from slot'} | ${labelFromSlotOptions}      | ${false} | ${undefined}          | ${false}
      ${'provided from prop'} | ${labelFromPropOptions}      | ${true}  | ${customOptionalText} | ${true}
      ${'provided from prop'} | ${labelFromPropOptions}      | ${false} | ${customOptionalText} | ${false}
      ${'provided from slot'} | ${labelFromSlotOptions}      | ${true}  | ${customOptionalText} | ${false}
      ${'provided from slot'} | ${labelFromSlotOptions}      | ${false} | ${customOptionalText} | ${false}
      ${'empty from prop'}    | ${emptyLabelFromPropOptions} | ${true}  | ${undefined}          | ${false}
      ${'empty from prop'}    | ${emptyLabelFromPropOptions} | ${false} | ${undefined}          | ${false}
      ${'empty from slot'}    | ${emptyLabelFromSlotOptions} | ${true}  | ${undefined}          | ${false}
      ${'empty from slot'}    | ${emptyLabelFromSlotOptions} | ${false} | ${undefined}          | ${false}
      ${'not provided'}       | ${noLabel}                   | ${true}  | ${undefined}          | ${false}
      ${'not provided'}       | ${noLabel}                   | ${false} | ${undefined}          | ${false}
    `(
      'when label is $labelFrom, `optional` is $optional, and `optionalText` is $optionalText',
      ({ options, optional, optionalText, expectedOptional }) => {
        createComponent({
          ...options,
          propsData: {
            ...options.propsData,
            optional,
            optionalText,
            labelClass: testLabelClass,
          },
        });

        const label = findLabel();
        const optionalLabel = findOptionalLabel();
        const expectedOptionalText = optionalText || '(optional)';
        const expectedLabelText = options.propsData?.label || options.slots?.label;

        expect(label.exists()).toBe(Boolean(expectedLabelText));
        if (expectedLabelText) {
          expect(wrapper.text()).toContain(expectedLabelText);
        }
        expect(optionalLabel.exists()).toBe(expectedOptional);
        if (expectedOptional) {
          expect(optionalLabel.text()).toBe(expectedOptionalText);
        }
      }
    );
  });
});
