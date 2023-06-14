import { shallowMount } from '@vue/test-utils';
import { toggleLabelPosition } from '../../../utils/constants';
import Icon from '../icon/icon.vue';
import LoadingIcon from '../loading_icon/loading_icon.vue';
import Toggle from './toggle.vue';

describe('toggle', () => {
  let wrapper;

  const label = 'toggle label';
  const descriptionText = 'description text';
  const helpText = 'help text';

  const createWrapper = (props = {}, options = {}) => {
    wrapper = shallowMount(Toggle, {
      propsData: {
        label,
        ...props,
      },
      ...options,
    });
  };

  const findButton = () => wrapper.find('button');
  const findDescriptionElement = () => wrapper.find('[data-testid="toggle-description"]');
  const findHelpElement = () => wrapper.find('[data-testid="toggle-help"]');

  it('has role=switch', () => {
    createWrapper();

    expect(findButton().attributes('role')).toBe('switch');
  });

  describe.each`
    state    | value    | ariaCheckedExpected | checkedClassExpected
    ${'on'}  | ${true}  | ${'true'}           | ${true}
    ${'off'} | ${false} | ${'false'}          | ${false}
  `('when $state', ({ value, ariaCheckedExpected, checkedClassExpected }) => {
    beforeEach(() => {
      createWrapper({ value });
    });

    it(`${value ? 'has' : 'does not have'} aria-checked`, () => {
      expect(findButton().attributes('aria-checked')).toBe(ariaCheckedExpected);
    });

    it(`${value ? 'has' : 'does not have'} checked class`, () => {
      expect(findButton().classes('is-checked')).toBe(checkedClassExpected);
    });
  });

  describe.each`
    state         | disabled | disabledClassExpected | changeEventPayload | ariaDisabledValue
    ${'enabled'}  | ${false} | ${false}              | ${[[true]]}        | ${undefined}
    ${'disabled'} | ${true}  | ${true}               | ${undefined}       | ${'true'}
  `('when $state', ({ disabled, disabledClassExpected, changeEventPayload, ariaDisabledValue }) => {
    beforeEach(() => {
      createWrapper({ disabled });
    });

    it(`${disabled ? 'has' : 'does not have'} disabled class`, () => {
      expect(findButton().classes('is-disabled')).toBe(disabledClassExpected);
    });

    it(`${disabled ? 'does not emit' : 'emits'} change event when clicked`, () => {
      findButton().trigger('click');

      expect(wrapper.emitted('change')).toEqual(changeEventPayload);
    });

    it(`sets aria-disabled attribute to ${ariaDisabledValue}`, () => {
      expect(findButton().attributes('aria-disabled')).toBe(ariaDisabledValue);
    });
  });

  describe.each`
    state            | isLoading
    ${'loading'}     | ${true}
    ${'not loading'} | ${false}
  `('when $state', ({ isLoading }) => {
    beforeEach(() => {
      createWrapper({ isLoading });
    });

    it(`${isLoading ? 'shows' : 'does not show'} loading spinner`, () => {
      expect(wrapper.findComponent(LoadingIcon).exists()).toBe(isLoading);
    });

    it(`${isLoading ? 'does not show' : 'shows'} toggle icon`, () => {
      expect(wrapper.findComponent(Icon).exists()).toBe(!isLoading);
    });
  });

  describe.each`
    state                                        | description        | props                                                                       | options
    ${'with description'}                        | ${descriptionText} | ${{ description: descriptionText }}                                         | ${undefined}
    ${'with description in slot'}                | ${descriptionText} | ${undefined}                                                                | ${{ slots: { description: descriptionText } }}
    ${'without description'}                     | ${undefined}       | ${undefined}                                                                | ${undefined}
    ${'with description and labelPosition left'} | ${undefined}       | ${{ desciption: descriptionText, labelPosition: toggleLabelPosition.left }} | ${undefined}
  `('$state', ({ description, props, options }) => {
    beforeEach(() => {
      createWrapper(props, options);
    });

    if (description) {
      it('shows description', () => {
        expect(findDescriptionElement().text()).toBe(description);
      });
    } else {
      it('does not show description', () => {
        expect(findDescriptionElement().exists()).toBe(false);
      });
    }
  });

  describe.each`
    state                                 | help         | props                                                          | options                          | getAriaDescribedBy
    ${'with help'}                        | ${helpText}  | ${{ help: helpText }}                                          | ${undefined}                     | ${() => findHelpElement().attributes('id')}
    ${'with help in slot'}                | ${helpText}  | ${undefined}                                                   | ${{ slots: { help: helpText } }} | ${() => findHelpElement().attributes('id')}
    ${'without help'}                     | ${undefined} | ${undefined}                                                   | ${undefined}                     | ${() => undefined}
    ${'with help and labelPosition left'} | ${undefined} | ${{ help: helpText, labelPosition: toggleLabelPosition.left }} | ${undefined}                     | ${() => undefined}
  `('$state', ({ help, props, options, getAriaDescribedBy }) => {
    beforeEach(() => {
      createWrapper(props, options);
    });

    it(`${help ? 'shows' : 'does not show'} help`, () => {
      expect(findHelpElement().exists()).toBe(Boolean(help));
      if (help) {
        expect(findHelpElement().text()).toBe(help);
      }
    });

    it(`${help ? 'describes' : 'does not describe'} the toggle button`, () => {
      expect(findButton().attributes('aria-describedby')).toBe(getAriaDescribedBy());
    });
  });

  describe('label position', () => {
    describe.each`
      state       | labelPosition                 | hasGlSrOnlyClass | flexDirection                 | showsHelpText | showsDescription
      ${'top'}    | ${toggleLabelPosition.top}    | ${false}         | ${'gl-flex-direction-column'} | ${true}       | ${true}
      ${'left'}   | ${toggleLabelPosition.left}   | ${false}         | ${'gl-toggle-label-inline'}   | ${false}      | ${false}
      ${'hidden'} | ${toggleLabelPosition.hidden} | ${true}          | ${'gl-flex-direction-column'} | ${true}       | ${true}
      ${'block'}  | ${toggleLabelPosition.block}  | ${false}         | ${'gl-toggle-label-inline'}   | ${true}       | ${true}
    `(
      'when $state',
      ({ labelPosition, hasGlSrOnlyClass, flexDirection, showsHelpText, showsDescription }) => {
        beforeEach(() => {
          createWrapper({ labelPosition, help: helpText, description: descriptionText });
        });

        it(`${flexDirection} class is added to the label`, () => {
          const cssClasses = wrapper.find('[data-testid="toggle-wrapper"]').classes();

          return expect(cssClasses).toContain(flexDirection);
        });

        it(`${hasGlSrOnlyClass ? 'adds' : 'does not add'} 'gl-sr-only' class to the label`, () => {
          const cssClasses = wrapper.find('[data-testid="toggle-label"]').classes();
          return hasGlSrOnlyClass
            ? expect(cssClasses).toContain('gl-sr-only')
            : expect(cssClasses).not.toContain('gl-sr-only');
        });

        it('has accessible name for the button', () => {
          expect(findButton().attributes('aria-labelledby')).toBeDefined();
        });

        it(`${showsHelpText ? 'shows' : 'does not show'} the help text`, () => {
          expect(findHelpElement().exists()).toBe(showsHelpText);
        });

        it(`${showsDescription ? 'shows' : 'does not show'} the description`, () => {
          expect(findDescriptionElement().exists()).toBe(showsDescription);
        });
      }
    );
  });
});
