import { shallowMount } from '@vue/test-utils';
import { DEFAULT_TAB_TITLE_LINK_CLASS } from '../constants';
import GlTab from './tab.vue';

describe('Tab component', () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(GlTab, {
      ...options,
    });
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
        propsData: {
          titleLinkClass,
        },
      });

      expect(wrapper.html()).toBe(
        `<b-tab-stub tag="div" title="" titlelinkclass="${expectedProp}"></b-tab-stub>`
      );
    }
  );
});
