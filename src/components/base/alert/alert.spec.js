import { shallowMount } from '@vue/test-utils';
import { alertVariantOptions, buttonCategoryOptions } from '../../../utils/constants';
import GlAlert from './alert.vue';

const DummyComponent = {
  template: '<p>dummy</p>',
};

const primaryButtonText = 'foo';
const primaryButtonLink = '#foo';
const secondaryButtonText = 'bar';
const secondaryButtonLink = '#bar';

describe('Alert component', () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(GlAlert, {
      ...options,
    });
  };

  const findIcon = () => wrapper.find('.gl-alert-icon');
  const findDismissButton = () => wrapper.findComponent({ ref: 'dismiss' });
  const findTitle = () => wrapper.find('.gl-alert-title');
  const findBodyContainer = () => wrapper.find('.gl-alert-body');
  const findActionsContainer = () => wrapper.find('.gl-alert-actions');
  const findActionButtons = () => wrapper.findAll('.gl-alert-action');

  describe('by default', () => {
    beforeEach(() => {
      createComponent({ slots: { default: DummyComponent } });
    });

    it('renders a variant icon', () => {
      expect(findIcon().exists()).toBe(true);
    });

    it('renders a dismiss button', () => {
      expect(findDismissButton().exists()).toBe(true);
    });

    it('clicking on dismiss button emits a dismiss event', () => {
      findDismissButton().vm.$emit('click');

      expect(wrapper.emitted('dismiss')).toHaveLength(1);
    });

    it('does not render a title', () => {
      expect(findTitle().exists()).toBe(false);
    });

    it('does not render any actions', () => {
      expect(findActionsContainer().exists()).toBe(false);
    });

    it('renders default slot content', () => {
      expect(findBodyContainer().findComponent(DummyComponent).exists()).toBe(true);
    });
  });

  it('does not render a variant icon when showIcon = false', () => {
    createComponent({ propsData: { showIcon: false } });

    expect(findIcon().exists()).toBe(false);
  });

  it('does not render a dismiss button when dismissible = false', () => {
    createComponent({ propsData: { dismissible: false } });

    expect(findDismissButton().exists()).toBe(false);
  });

  it('renders the provided title with heading level 2', () => {
    const title = 'foo';
    createComponent({ propsData: { title } });

    const titleWrapper = findTitle();
    expect(titleWrapper.exists()).toBe(true);
    expect(titleWrapper.text()).toContain(title);
    // the title needs to be in a level 2 heading for accessibility reasons
    expect(titleWrapper.element.tagName).toEqual('H2');
  });

  describe('given primaryButtonText', () => {
    beforeEach(() => {
      createComponent({ propsData: { primaryButtonText } });
    });

    it('renders a primary button', () => {
      expect(findActionsContainer().exists()).toBe(true);

      const buttons = findActionButtons();
      expect(buttons).toHaveLength(1);

      const button = buttons.at(0);
      expect(button.text()).toContain(primaryButtonText);

      const props = button.props();
      expect('href' in props).toBe(false);
      expect(props.category).toEqual(buttonCategoryOptions.primary);
    });

    it('emits a primaryAction event when primary button is clicked', () => {
      findActionButtons().at(0).vm.$emit('click');

      expect(wrapper.emitted('primaryAction')).toHaveLength(1);
    });
  });

  describe('given primaryButtonText and primaryButtonLink', () => {
    beforeEach(() => {
      createComponent({ propsData: { primaryButtonText, primaryButtonLink } });
    });

    it('renders a primary button with an href given primaryButtonLink', () => {
      const button = findActionButtons().at(0);
      expect(button.attributes('href')).toEqual(primaryButtonLink);
    });
  });

  describe('given secondaryButtonText', () => {
    beforeEach(() => {
      createComponent({ propsData: { secondaryButtonText } });
    });

    it('renders a secondary button', () => {
      expect(findActionsContainer().exists()).toBe(true);

      const buttons = findActionButtons();
      expect(buttons).toHaveLength(1);

      const button = buttons.at(0);
      expect(button.text()).toContain(secondaryButtonText);

      const props = button.props();
      expect('href' in props).toBe(false);
      expect(props.category).toEqual(buttonCategoryOptions.secondary);
    });

    it('emits a secondaryAction event when secondary button is clicked', () => {
      findActionButtons().at(0).vm.$emit('click');

      expect(wrapper.emitted('secondaryAction')).toHaveLength(1);
    });
  });

  describe('given secondaryButtonText and secondaryButtonLink', () => {
    beforeEach(() => {
      createComponent({ propsData: { secondaryButtonText, secondaryButtonLink } });
    });

    it('renders a secondary button with an href given secondaryButtonLink', () => {
      const button = findActionButtons().at(0);
      expect(button.attributes('href')).toEqual(secondaryButtonLink);
    });
  });

  it('renders actions slot content', () => {
    createComponent({ slots: { actions: DummyComponent } });

    const actionsContainer = findActionsContainer();
    expect(actionsContainer.exists()).toBe(true);
    expect(actionsContainer.findComponent(DummyComponent).exists()).toBe(true);
  });

  describe('top-level classes', () => {
    describe.each`
      prop             | cssClass                      | presentIf
      ${'sticky'}      | ${'gl-alert-sticky'}          | ${true}
      ${'dismissible'} | ${'gl-alert-not-dismissible'} | ${false}
    `('$cssClass', ({ prop, cssClass, presentIf }) => {
      it(`adds class ${cssClass} when ${prop} is ${presentIf}`, () => {
        createComponent({
          propsData: {
            [prop]: presentIf,
          },
        });

        expect(wrapper.classes()).toContain(cssClass);
      });

      it(`does not add class ${cssClass} when ${prop} is ${!presentIf}`, () => {
        createComponent({
          propsData: {
            [prop]: !presentIf,
          },
        });

        expect(wrapper.classes()).not.toContain(cssClass);
      });
    });

    it('adds the `gl-alert-has-title` class if there is a title', () => {
      createComponent({
        propsData: {
          title: 'title',
        },
      });

      expect(wrapper.classes()).toContain('gl-alert-has-title');
    });

    it('does not add the `gl-alert-has-title` class if there is no title', () => {
      createComponent();

      expect(wrapper.classes()).not.toContain('gl-alert-has-title');
    });
  });

  describe('role and aria-live', () => {
    it.each`
      variant                        | role        | assertiveness
      ${alertVariantOptions.danger}  | ${'alert'}  | ${'assertive'}
      ${alertVariantOptions.warning} | ${'alert'}  | ${'assertive'}
      ${alertVariantOptions.info}    | ${'status'} | ${'polite'}
      ${alertVariantOptions.success} | ${'alert'}  | ${'polite'}
      ${alertVariantOptions.tip}     | ${'status'} | ${'polite'}
    `(
      '$variant variant has role "$role" and aria-live "$assertiveness"',
      ({ variant, role, assertiveness }) => {
        createComponent({ propsData: { variant } });

        expect(wrapper.find(`[role="${role}"`).exists()).toBe(true);
        expect(wrapper.find(`[aria-live="${assertiveness}"`).exists()).toBe(true);
      }
    );
  });
});
