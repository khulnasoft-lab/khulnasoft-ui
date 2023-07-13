import { shallowMount } from '@vue/test-utils';
import GlBlock from './block.vue';

describe('GlBlock', () => {
  let wrapper;

  const HEADER_TEXT = 'In legal trouble?';
  const BODY_TEXT = 'Better call Saul!';
  const FOOTER_TEXT = '(505) 503-4455';

  const HEADER_CLASS = '.bg-red .text-white';
  const BODY_CLASS = '.bg-yellow .font-script';
  const FOOTER_CLASS = '.bg-yellow .text-white';

  const createWrapper = (options = {}) => {
    wrapper = shallowMount(GlBlock, options);
  };

  const findBody = () => wrapper.find('.gl-block-body');
  const findHeader = () => wrapper.find('.gl-block-header');
  const findFooter = () => wrapper.find('.gl-block-footer');

  describe('with just the body content', () => {
    beforeEach(() => {
      createWrapper({
        propsData: {
          bodyClass: BODY_CLASS,
        },
        slots: {
          default: BODY_TEXT,
        },
      });
    });

    it('should render the body content', () => {
      expect(findBody().exists()).toBe(true);
      expect(findBody().text()).toEqual(BODY_TEXT);
    });

    it('should add the body class', () => {
      expect(findBody().classes()).toContain(...BODY_CLASS.split(' '));
    });

    it('should not render the header content', () => {
      expect(findHeader().exists()).toBe(false);
    });

    it('should not render the footer content', () => {
      expect(findFooter().exists()).toBe(false);
    });
  });

  describe('with additional header content', () => {
    beforeEach(() => {
      createWrapper({
        propsData: {
          headerClass: HEADER_CLASS,
        },
        slots: {
          default: BODY_TEXT,
          header: HEADER_TEXT,
        },
      });
    });

    it('should render the body content', () => {
      expect(findBody().exists()).toBe(true);
      expect(findBody().text()).toEqual(BODY_TEXT);
    });

    it('should render the header content', () => {
      expect(findHeader().exists()).toBe(true);
      expect(findHeader().text()).toEqual(HEADER_TEXT);
    });

    it('should add the header class', () => {
      expect(findHeader().classes()).toContain(...HEADER_CLASS.split(' '));
    });

    it('should not render the footer content', () => {
      expect(findFooter().exists()).toBe(false);
    });
  });

  describe('with additional footer content', () => {
    beforeEach(() => {
      createWrapper({
        propsData: {
          footerClass: FOOTER_CLASS,
        },
        slots: {
          default: BODY_TEXT,
          footer: FOOTER_TEXT,
        },
      });
    });

    it('should render the body content', () => {
      expect(findBody().exists()).toBe(true);
      expect(findBody().text()).toEqual(BODY_TEXT);
    });

    it('should not render the header content', () => {
      expect(findHeader().exists()).toBe(false);
    });

    it('should render the footer content', () => {
      expect(findFooter().exists()).toBe(true);
      expect(findFooter().text()).toEqual(FOOTER_TEXT);
    });

    it('should add the footer class', () => {
      expect(findFooter().classes()).toContain(...FOOTER_CLASS.split(' '));
    });
  });

  it.each`
    prop             | value                                                    | finder        | expected
    ${'bodyClass'}   | ${{ 'applied-class': true, 'non-applied-class': false }} | ${findBody}   | ${['gl-block-body', 'applied-class']}
    ${'bodyClass'}   | ${['applied-class']}                                     | ${findBody}   | ${['gl-block-body', 'applied-class']}
    ${'headerClass'} | ${{ 'applied-class': true, 'non-applied-class': false }} | ${findHeader} | ${['gl-block-header', 'applied-class']}
    ${'headerClass'} | ${['applied-class']}                                     | ${findHeader} | ${['gl-block-header', 'applied-class']}
    ${'footerClass'} | ${{ 'applied-class': true, 'non-applied-class': false }} | ${findFooter} | ${['gl-block-footer', 'applied-class']}
    ${'footerClass'} | ${['applied-class']}                                     | ${findFooter} | ${['gl-block-footer', 'applied-class']}
  `('properly sets classes when $prop is $value', ({ prop, value, finder, expected }) => {
    createWrapper({
      propsData: {
        [prop]: value,
      },
      slots: {
        default: BODY_TEXT,
        header: HEADER_TEXT,
        footer: FOOTER_TEXT,
      },
    });

    expect(finder().classes()).toEqual(expected);
  });
});
