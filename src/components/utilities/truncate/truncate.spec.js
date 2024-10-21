import { nextTick } from 'vue';
import { shallowMount } from '@vue/test-utils';
import {
  getBinding,
  createMockDirective as mockDirectiveCreator,
} from '~helpers/vue_mock_directive';
import { POSITION } from './constants';
import Truncate from './truncate.vue';

jest.mock('../../../directives/resize_observer/resize_observer', () => ({
  GlResizeObserverDirective: mockDirectiveCreator('gl-resize-observer'),
}));

const removeSpecialChar = (text) => {
  return text.replace(/&lrm;|\u200E/gi, '');
};

const positionOptions = Object.values(POSITION);

describe('Truncate component', () => {
  let wrapper;

  const defaultProps = {
    text: 'ee/app/assets/javascripts/vue_shared/src/utils_reports/components/utils/index.js',
  };

  const createComponent = ({ classes, ...props } = {}) => {
    wrapper = shallowMount(Truncate, {
      propsData: { ...defaultProps, ...props },
      attrs: {
        class: classes,
      },
    });
  };

  const forceTruncate = () => {
    // We check that scrollWidth > offsetWidth so we can force this in our test environment by overriding the properties.
    const child = wrapper.findComponent({ ref: 'text' }).element;

    Object.defineProperties(child, {
      scrollWidth: {
        get() {
          return 9001;
        },
      },
      offsetWidth: {
        get() {
          return 1;
        },
      },
    });
  };

  const triggerResizeObserver = async () => {
    const callback = getBinding(
      wrapper.find('.gl-truncate-component').element,
      'gl-resize-observer'
    ).value;

    callback();

    await nextTick();
  };

  describe('All', () => {
    beforeEach(() => {
      createComponent();
    });

    it.each(positionOptions)(
      '%s truncation: should class, original text, and no title',
      (position) => {
        createComponent({ position });
        const element = wrapper.find('span');
        expect(element.attributes('title')).toBeUndefined();
        expect(element.attributes('class')).toBe('gl-truncate-component');
        expect(removeSpecialChar(wrapper.text())).toBe(defaultProps.text);
      }
    );

    it('should have the default position', () => {
      expect(wrapper.props('position')).toBe('end');
    });

    it('disables the tooltip by default', () => {
      expect(
        getBinding(wrapper.find('.gl-truncate-component').element, 'gl-tooltip').value.disabled
      ).toBe(true);
    });
  });

  describe('with tooltip', () => {
    beforeEach(() => {
      createComponent({ withTooltip: true });
    });

    it('enables the tooltip', async () => {
      forceTruncate();
      await triggerResizeObserver();

      expect(
        getBinding(wrapper.find('.gl-truncate-component').element, 'gl-tooltip').value.disabled
      ).toBe(false);
    });

    it('has title', () => {
      const element = wrapper.find('span');

      expect(element.attributes('title')).toBe(defaultProps.text);
    });
  });

  describe('start truncation', () => {
    beforeEach(() => {
      createComponent({ position: 'start' });
    });

    it('should have the truncate-start class', () => {
      expect(wrapper.find('.gl-truncate-start').exists()).toBe(true);
    });

    it('should have the special char surrounded', () => {
      const spanTag = wrapper.findAll('.gl-truncate-component span').at(0).text();

      expect(spanTag.charAt(0)).toBe('\u200E');
      expect(spanTag.charAt(spanTag.length - 1)).toBe('\u200E');
    });
  });

  describe('middle truncation', () => {
    let firstSpan;
    let secondSpan;

    beforeEach(() => {
      createComponent({ position: 'middle' });
      firstSpan = wrapper.findAll('.gl-truncate-component span').at(0);
      secondSpan = wrapper.findAll('.gl-truncate-component span').at(1);
    });

    it('should have appropriate classes applied', () => {
      expect(firstSpan.classes('gl-truncate-end')).toBe(true);
      expect(secondSpan.classes('gl-truncate-start')).toBe(true);
    });

    it('should have the spans positioned correctly', () => {
      expect(firstSpan.text()).toBe('ee/app/assets/javascripts/vue_shared/src');
      expect(secondSpan.text()).toBe('‎/utils_reports/components/utils/index.js‎');
    });

    it('last part should have the special char surrounded', () => {
      const lastPart = secondSpan.text();

      expect(lastPart.charAt(0)).toBe('\u200E');
      expect(lastPart.charAt(lastPart.length - 1)).toBe('\u200E');
    });
  });

  describe('end truncation', () => {
    beforeEach(() => {
      createComponent();
    });

    it('should not have the special char', () => {
      expect(wrapper.text()).not.toContain('\u200E');
    });

    it('should have the truncate-end class', () => {
      expect(wrapper.find('.gl-truncate-end').exists()).toBe(true);
    });
  });

  // This tests a workaround for a subtle Vue 2/3 compiler difference.
  // See https://github.com/vuejs/core/issues/7909.
  describe('parent classes', () => {
    beforeEach(() => {
      createComponent({ classes: 'test-class' });
    });

    it('applies classes from parent', () => {
      expect(wrapper.classes()).toContain('test-class');
    });
  });
});
