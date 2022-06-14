import { shallowMount } from '@vue/test-utils';
import { BTab } from 'bootstrap-vue';
import { DEFAULT_TAB_TITLE_LINK_CLASS } from '../constants';
import GlTab from './tab.vue';

describe('Tab component', () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(GlTab, { ...options });
  };

  it.each`
    titleLinkClass                  | expectedProp
    ${''}                           | ${`${DEFAULT_TAB_TITLE_LINK_CLASS}`}
    ${'additional-class'}           | ${`additional-class ${DEFAULT_TAB_TITLE_LINK_CLASS}`}
    ${['additional-class']}         | ${['additional-class', DEFAULT_TAB_TITLE_LINK_CLASS]}
    ${{ 'additional-class': true }} | ${{ 'additional-class': true, 'gl-tab-nav-item': true }}
    ${undefined}                    | ${DEFAULT_TAB_TITLE_LINK_CLASS}
  `(
    'computed title link class is $expectedProp when titleLinkClass is $titleLinkClass',
    ({ titleLinkClass, expectedProp }) => {
      createComponent({
        propsData: { titleLinkClass },
      });

      expect(wrapper.findComponent(BTab).props('titleLinkClass')).toEqual(expectedProp);
    }
  );

  it('passes title-link-attributes to b-tab when href is explicitly passed', () => {
    const titleLinkAttributes = 'href-example';
    const expectedProp = { href: titleLinkAttributes };
    createComponent({
      propsData: { href: titleLinkAttributes },
    });
    expect(wrapper.findComponent(BTab).props('titleLinkAttributes')).toEqual(expectedProp);
  });

  it('passes # as href to b-tab when href is not passed', () => {
    const expectedProp = { href: '#' };
    createComponent();
    expect(wrapper.findComponent(BTab).props('titleLinkAttributes')).toEqual(expectedProp);
  });
});
