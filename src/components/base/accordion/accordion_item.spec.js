import { mount } from '@vue/test-utils';
import { BCollapse } from 'bootstrap-vue';
import { GlCollapseToggleDirective } from '../../../directives/collapse_toggle';
import { waitForAnimationFrame } from '../../../utils/test_utils';
import GlButton from '../button/button.vue';
import GlAccordionItem from './accordion_item.vue';

describe('GlAccordionItem', () => {
  let wrapper;
  const defaultTitle = 'Item 1';
  const titleVisible = 'Item 1 visible';
  const defaultSlot = 'Hello';

  const createComponent = (props = {}, { defaultHeaderLevel = 3, accordionSetId = false } = {}) => {
    wrapper = mount(GlAccordionItem, {
      directives: {
        GlCollapseToggle: GlCollapseToggleDirective,
      },
      provide: {
        defaultHeaderLevel: () => defaultHeaderLevel,
        accordionSetId: () => accordionSetId,
      },
      propsData: {
        title: defaultTitle,
        ...props,
      },
      slots: {
        default: defaultSlot,
      },
    });
  };

  const findButton = () => wrapper.findComponent(GlButton);
  const findCollapse = () => wrapper.findComponent(BCollapse);
  const findHeader = () => wrapper.find('.gl-accordion-item-header');

  it('renders button text', () => {
    createComponent();

    expect(findButton().find('span').text()).toBe(defaultTitle);
  });

  it('renders alternative button text when the content is visible and the titleVisible property is set', async () => {
    createComponent({ titleVisible });

    expect(findButton().find('span').text()).toBe(defaultTitle);

    await waitForAnimationFrame();
    await findButton().trigger('click');

    expect(findButton().find('span').text()).toBe(titleVisible);
  });

  it('renders the appropriate header element', () => {
    createComponent({}, { defaultHeaderLevel: 3 });

    expect(wrapper.find('h3.gl-accordion-item-header').exists()).toBe(true);
    expect(wrapper.find('h4.gl-accordion-item-header').exists()).toBe(false);
  });

  it('renders the appropriate header element when overridden', () => {
    createComponent({ headerLevel: 4 }, { defaultHeaderLevel: 3 });

    expect(wrapper.find('h3.gl-accordion-item-header').exists()).toBe(false);
    expect(wrapper.find('h4.gl-accordion-item-header').exists()).toBe(true);
  });

  it.each(['custom-header-class', ['custom-header-class'], { 'custom-header-class': true }])(
    'applies custom classes to the header',
    (customClassProp) => {
      createComponent({ headerClass: customClassProp }, { defaultHeaderLevel: 3 });

      expect(findHeader().classes()).toContain('custom-header-class');
    }
  );

  it('renders slot text', () => {
    createComponent();

    expect(findCollapse().text()).toBe(defaultSlot);
  });

  it('is not expanded by default', () => {
    createComponent();

    expect(findButton().props('icon')).toBe('chevron-right');
    expect(findCollapse().props('visible')).toBe(false);
  });

  it('is expanded on button click', async () => {
    createComponent();

    await waitForAnimationFrame();
    await findButton().trigger('click');

    expect(findButton().props('icon')).toBe('chevron-down');
    expect(findCollapse().props('visible')).toBe(true);
  });

  it('passes accordion identifier to BCollapse', () => {
    const accordionId = 'my-accordion';

    createComponent({}, { accordionSetId: accordionId });

    expect(findCollapse().props('accordion')).toBe(accordionId);
  });

  it('expands initially when visible prop is passed', async () => {
    createComponent({ visible: true });

    await wrapper.vm.$nextTick();

    expect(findButton().props('icon')).toBe('chevron-down');
    expect(findCollapse().props('visible')).toBe(true);
  });

  it('emits the initial visible state', () => {
    createComponent({ visible: true });

    expect(wrapper.emitted('input')).toEqual([[true]]);
  });

  it('emits the visible state when toggled', async () => {
    createComponent({ visible: true });

    await waitForAnimationFrame();
    await findButton().trigger('click');

    expect(wrapper.emitted('input')).toEqual([[true], [false]]);
  });
});
