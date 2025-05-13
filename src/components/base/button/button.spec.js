import { mount } from '@vue/test-utils';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';
import { SPACE, ENTER } from '../new_dropdowns/constants';
import GlLink from '../link/link.vue';
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

      it('should set noopener noreferrer rel for hrefs for the same domain', () => {
        buildWrapper({
          propsData: {
            target: '_blank',
            href: window.location.hostname,
          },
        });
        expect(wrapper.attributes('rel')).toBe('noopener noreferrer');
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

  it('passes link props to GlLink', () => {
    buildWrapper({
      propsData: {
        to: '/foo/bar',
        activeClass: 'active-foo',
        exactActiveClass: 'exact-active-foo',
        prefetch: true,
        rel: 'author',
        target: '_blank',
      },
    });

    expect(wrapper.findComponent(GlLink).props()).toEqual({
      active: false,
      activeClass: 'active-foo',
      disabled: false,
      exactActiveClass: 'exact-active-foo',
      isUnsafeLink: false,
      prefetch: true,
      rel: 'author',
      replace: false,
      showExternalIcon: false,
      target: '_blank',
      to: '/foo/bar',
      variant: 'unstyled',
    });
  });

  it('has default structure and classes', () => {
    buildWrapper();

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.attributes('type')).toBe('button');
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['btn', 'btn-default', 'gl-button']));
    expect(wrapper.attributes('href')).toBeUndefined();
    expect(wrapper.attributes('role')).toBeUndefined();
    expect(wrapper.attributes('disabled')).toBeUndefined();
    expect(wrapper.attributes('aria-disabled')).toBeUndefined();
    expect(wrapper.attributes('tabindex')).toBeUndefined();
  });

  it('renders a link when href provided', () => {
    buildWrapper({
      propsData: {
        href: '/foo/bar',
      },
    });

    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe('/foo/bar');
  });

  it('renders default slot content', () => {
    buildWrapper({
      slots: {
        default: '<span>foobar</span>',
      },
    });

    expect(wrapper.text()).toBe('foobar');
  });

  it('applies block class', () => {
    buildWrapper({
      propsData: {
        block: true,
      },
    });

    expect(wrapper.classes()).toContain('btn-block');
  });

  it('renders custom root element', () => {
    buildWrapper({
      propsData: {
        tag: 'div',
      },
    });

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.attributes('tabindex')).toBe('0');
  });

  it('button has disabled attribute when disabled set', () => {
    buildWrapper({
      propsData: {
        disabled: true,
      },
    });

    expect(wrapper.attributes('disabled')).toBe('disabled');
    expect(wrapper.classes()).toContain('disabled');
    expect(wrapper.attributes('aria-disabled')).toBeUndefined();
  });

  it('link has aria-disabled attribute when disabled set', () => {
    buildWrapper({
      propsData: {
        href: '/foo/bar',
        disabled: true,
      },
    });

    expect(wrapper.classes()).toContain('disabled');
    expect(wrapper.attributes('aria-disabled')).toBe('true');
  });

  it('link with href="#" should have role="button"', () => {
    buildWrapper({
      propsData: {
        href: '#',
      },
    });

    expect(wrapper.attributes('role')).toEqual('button');
  });

  it('should emit click event when clicked', async () => {
    const onClick = jest.fn();

    buildWrapper({
      listeners: {
        click: onClick,
      },
    });

    await wrapper.trigger('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('should treat link with href="#" keydown.space as click', async () => {
    const onClick = jest.fn();
    buildWrapper({
      propsData: {
        href: '#',
      },
      listeners: {
        click: onClick,
      },
    });

    // We add keydown.space to make links act like buttons
    await wrapper.trigger('keydown', { code: SPACE });
    expect(onClick).toHaveBeenCalled();
  });

  it('should treat non-standard tag keydown.space as click', async () => {
    const onClick = jest.fn();
    buildWrapper({
      propsData: {
        tag: 'div',
      },
      listeners: {
        click: onClick,
      },
    });

    // We add keydown.space to make links act like buttons
    await wrapper.trigger('keydown', { code: SPACE });
    expect(onClick).toHaveBeenCalled();
  });

  it('should treat non-standard tag keydown.enter as click', async () => {
    const onClick = jest.fn();
    buildWrapper({
      propsData: {
        tag: 'div',
      },
      listeners: {
        click: onClick,
      },
    });

    // We add keydown.space to make links act like buttons
    await wrapper.trigger('keydown', { code: ENTER });
    expect(onClick).toHaveBeenCalled();
  });

  it('should not emit click event when clicked and disabled', async () => {
    const onClick = jest.fn();
    buildWrapper({
      propsData: {
        disabled: true,
      },
      listeners: {
        click: onClick,
      },
    });

    await wrapper.trigger('click');
    expect(onClick).not.toHaveBeenCalled();
  });
});
