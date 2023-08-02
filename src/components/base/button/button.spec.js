import { mount } from '@vue/test-utils';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';
import GlButton from './button.vue';

describe('button component', () => {
  let wrapper;

  const buildWrapper = (options = {}) => {
    wrapper = mount(GlButton, options);
  };
  const findLoadingIcon = () => wrapper.findComponent(GlLoadingIcon);

  it('renders a button', () => {
    buildWrapper();

    expect(wrapper.element.tagName).toBe('BUTTON');
  });

  describe('ellipsis button', () => {
    beforeEach(() => {
      buildWrapper({
        propsData: {
          icon: 'ellipsis_h',
        },
      });
    });

    it('should add `button-ellipsis-horizontal` class', () => {
      expect(wrapper.classes()).toContain('button-ellipsis-horizontal');
    });
  });

  describe('label button', () => {
    describe('default', () => {
      beforeEach(() => {
        buildWrapper({
          propsData: {
            label: true,
          },
        });
      });

      it('renders as a span', () => {
        expect(wrapper.element.tagName).toBe('SPAN');
      });

      it('should add `btn` and `btn-label` classes', () => {
        const classes = wrapper.classes();
        expect(classes).toContain('btn');
        expect(classes).toContain('btn-label');
      });
    });

    it.each`
      size         | expectedClass
      ${undefined} | ${'btn-md'}
      ${'small'}   | ${'btn-sm'}
    `('applies $expectedClass class when size is $size', ({ size, expectedClass }) => {
      buildWrapper({
        propsData: {
          label: true,
          size,
        },
      });

      expect(wrapper.classes()).toContain(expectedClass);
    });
  });

  describe('loading indicator', () => {
    beforeEach(() => {
      buildWrapper({
        propsData: {
          loading: true,
        },
      });
    });

    it('should render the loading indicator', () => {
      expect(findLoadingIcon().exists()).toBe(true);
    });

    it('should render the loading indicator with the `gl-button-loading-indicator` class', () => {
      expect(findLoadingIcon().classes()).toContain('gl-button-loading-indicator');
    });
  });

  it.each`
    variant      | category       | expectedClass
    ${'default'} | ${'primary'}   | ${'btn-default'}
    ${'default'} | ${'secondary'} | ${'btn-default-secondary'}
    ${'default'} | ${'tertiary'}  | ${'btn-default-tertiary'}
    ${'confirm'} | ${'primary'}   | ${'btn-confirm'}
    ${'confirm'} | ${'secondary'} | ${'btn-confirm-secondary'}
    ${'confirm'} | ${'tertiary'}  | ${'btn-confirm-tertiary'}
    ${'info'}    | ${'primary'}   | ${'btn-info'}
    ${'info'}    | ${'secondary'} | ${'btn-info-secondary'}
    ${'info'}    | ${'tertiary'}  | ${'btn-info-tertiary'}
    ${'success'} | ${'primary'}   | ${'btn-success'}
    ${'success'} | ${'secondary'} | ${'btn-success-secondary'}
    ${'success'} | ${'tertiary'}  | ${'btn-success-tertiary'}
    ${'danger'}  | ${'primary'}   | ${'btn-danger'}
    ${'danger'}  | ${'secondary'} | ${'btn-danger-secondary'}
    ${'danger'}  | ${'tertiary'}  | ${'btn-danger-tertiary'}
  `(
    'adds $expectedClass class when variant=$variant and category=$category',
    ({ variant, category, expectedClass }) => {
      buildWrapper({
        propsData: {
          icon: 'ellipsis_h',
          variant,
          category,
        },
      });

      expect(wrapper.classes()).toContain(expectedClass);
    }
  );

  describe('link button', () => {
    describe('link to #', () => {
      beforeEach(() => {
        buildWrapper({
          propsData: {
            href: '#',
          },
        });
      });

      it('should not have a target attribute', () => {
        expect(wrapper.attributes('target')).toBeUndefined();
      });

      it('should not have a rel attribute', () => {
        expect(wrapper.attributes('rel')).toBeUndefined();
      });
    });

    describe('target blank', () => {
      it('should set secure rels for hrefs in a different domain', () => {
        buildWrapper({
          propsData: {
            target: '_blank',
            href: 'http://example.com',
          },
        });

        expect(wrapper.attributes('rel')).toBe('noopener noreferrer');
      });

      it('should set noopener rel for hrefs for the same domain', () => {
        // This behavior is due to the fact that
        // bootstrap-vue link component adds rel="noopener" when target is set as "_blank"
        // https://github.com/bootstrap-vue/bootstrap-vue/pull/418/files#diff-997fcb1eb150236aec5306a4d72229beR25
        buildWrapper({
          propsData: {
            target: '_blank',
            href: window.location.hostname,
          },
        });
        expect(wrapper.attributes('rel')).toBe('noopener');
      });

      it('should keep rel attribute for hrefs in the same domain', () => {
        buildWrapper({ attrs: { rel: 'nofollow', href: window.location.hostname } });

        expect(wrapper.attributes('rel')).toBe('nofollow');
      });
    });

    describe('unsafe urls', () => {
      // eslint-disable-next-line no-script-url
      const unsafeUrl = 'javascript:alert(1)';

      // GlSafeLinkDirective is actually responsible to handle the unsafe URLs
      // and GlButton uses this directive to make all the links secure by default
      it('should set href to blank', () => {
        buildWrapper({
          propsData: {
            href: unsafeUrl,
          },
        });

        expect(wrapper.attributes('href')).toBe('about:blank');
      });

      it('should allow unsafe URL if isUnsafeLink is true', () => {
        buildWrapper({
          propsData: {
            href: unsafeUrl,
            isUnsafeLink: true,
          },
        });

        expect(wrapper.attributes('href')).toBe(unsafeUrl);
      });

      it.each`
        description                                       | label    | expectedResult
        ${'applies block styling'}                        | ${true}  | ${false}
        ${'does not apply block styling when label=true'} | ${false} | ${true}
      `('block prop $description', ({ label, expectedResult }) => {
        buildWrapper({
          propsData: {
            label,
            block: true,
          },
        });

        expect(wrapper.classes().includes('btn-block')).toBe(expectedResult);
      });
    });
  });

  it('should correctly detect empty content for icon only mode', () => {
    const DemoComponent = {
      components: { GlButton },
      template: `<gl-button icon="ellipsis_h"><slot><span v-if="false">not-rendered</span></slot></gl-button>`,
    };

    wrapper = mount(DemoComponent);

    expect(wrapper.classes()).toContain('btn-icon');
  });
});
