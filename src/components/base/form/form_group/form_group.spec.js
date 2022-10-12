import { shallowMount } from '@vue/test-utils';
import { BFormGroup } from 'bootstrap-vue';
import GlFormGroup from './form_group.vue';

describe('Form group component', () => {
  let wrapper;

  const findByTestId = (testId) => wrapper.find(`[data-testid="${testId}"]`);

  const findLabelDescription = () => findByTestId('label-description');
  const findOptionalLabel = () => findByTestId('optional-label');

  const createComponent = (options) => {
    wrapper = shallowMount(GlFormGroup, {
      ...options,
      stubs: { BFormGroup },
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
    const labelFromPropOptions = {
      propsData: { label: 'label from props' },
    };
    const labelFromSlotOptions = {
      slots: { label: 'label from slots' },
    };

    it.each`
      labelFrom | options                 | optional | expectedOptional
      ${'prop'} | ${labelFromPropOptions} | ${true}  | ${true}
      ${'prop'} | ${labelFromPropOptions} | ${false} | ${false}
      ${'slot'} | ${labelFromSlotOptions} | ${true}  | ${false}
      ${'slot'} | ${labelFromSlotOptions} | ${false} | ${false}
    `(
      'when label is provided from $labelFrom, `optional` is $optional',
      ({ labelFrom, options, optional, expectedOptional }) => {
        createComponent({
          ...options,
          propsData: {
            ...options.propsData,
            optional,
          },
        });

        expect(wrapper.text()).toContain(`label from ${labelFrom}`);
        expect(findOptionalLabel().exists()).toBe(expectedOptional);
      }
    );

    it('renders optionalText when `optional` is true', () => {
      const optionalText = '(not required)';

      createComponent({
        propsData: {
          optional: true,
          optionalText,
        },
      });

      expect(findOptionalLabel().text()).toBe(optionalText);
    });
  });
});
