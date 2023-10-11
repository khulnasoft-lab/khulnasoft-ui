import { shallowMount } from '@vue/test-utils';
import throttle from 'lodash/throttle';
import InfiniteScroll, { adjustScrollGap } from './infinite_scroll.vue';

jest.mock('lodash/throttle', () => jest.fn((fn) => fn));

const INITIAL_HEIGHT = 500;
const INITIAL_SCROLL_TOP = 0;
const ADJUST_SCROLL_GAP = adjustScrollGap;

describe('Infinite Scroll component', () => {
  let wrapper;
  let mockScrollHeight;
  let mockScrollTop;
  let mockScrollTo;

  const findInfiniteContainer = () => wrapper.findComponent({ ref: 'infiniteContainer' });

  const props = {
    fetchedItems: 2,
    totalItems: 10,
  };

  const createComponent = ({ propsData = props, listeners = {} } = {}) => {
    wrapper = shallowMount(InfiniteScroll, {
      propsData,
      listeners,
      attachTo: document.body,
    });

    // Mock properties on the container that are not in JSDOM
    mockScrollTo = jest.fn(({ top }) => {
      mockScrollTop = top;
      findInfiniteContainer().trigger('scroll');
    });

    Object.defineProperties(findInfiniteContainer().element, {
      scrollTo: {
        get: () => mockScrollTo,
      },
      scrollTop: {
        get: () => mockScrollTop,
      },
      scrollHeight: {
        get: () => mockScrollHeight,
        set: (val) => {
          mockScrollHeight = val;
        },
      },
    });
  };

  beforeEach(() => {
    mockScrollHeight = INITIAL_HEIGHT;
    mockScrollTop = INITIAL_SCROLL_TOP;
  });

  afterEach(() => {
    throttle.mockClear();
  });

  it('emits nothing on creation', () => {
    createComponent();

    return wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted('bottomReached')).toBe(undefined);
      expect(wrapper.emitted('topReached')).toBe(undefined);
    });
  });

  it('emits bottomReached when scrolled to the bottom', () => {
    createComponent();

    expect(wrapper.emitted('bottomReached')).toBe(undefined);

    mockScrollTo({ top: INITIAL_HEIGHT - 0.5 });
    expect(wrapper.emitted('bottomReached')).toHaveLength(1);
  });

  it('emits topReached when scrolled to the top', () => {
    mockScrollTop = mockScrollHeight;

    createComponent();

    expect(wrapper.emitted('topReached')).toBe(undefined);

    mockScrollTo({ top: 0 });
    expect(wrapper.emitted('topReached')).toHaveLength(1);
  });

  it('scrolls to the bottom when `topReached` is defined', () => {
    createComponent({
      listeners: {
        topReached: () => {},
      },
    });

    return wrapper.vm.$nextTick(() => {
      expect(mockScrollTo).toHaveBeenCalledWith({ top: INITIAL_HEIGHT - ADJUST_SCROLL_GAP });
    });
  });

  it('does not scroll to the bottom when `topReached` and `bottomReached` are defined', () => {
    createComponent({
      listeners: {
        bottomReached: () => {},
        topReached: () => {},
      },
    });

    return wrapper.vm.$nextTick(() => {
      expect(mockScrollTo).not.toHaveBeenCalled();
    });
  });

  it('scroll past loaded items', () => {
    createComponent();

    const BATCH_HEIGHT = 100;

    // Mock more items are loaded
    wrapper.setProps({ fetchedItems: 4 });

    return wrapper.vm.$nextTick(() => {
      // Mock list was expanded in height by BATCH_HEIGHT px
      mockScrollHeight = INITIAL_HEIGHT + BATCH_HEIGHT;

      return wrapper.vm.$nextTick(() => {
        expect(mockScrollTo).toHaveBeenCalledWith({
          top: BATCH_HEIGHT - ADJUST_SCROLL_GAP,
        });
      });
    });
  });

  describe('the legend', () => {
    describe.each`
      totalItems   | expectedLegend
      ${99}        | ${'Showing 2 of 99 items'}
      ${2}         | ${'Showing 2 of 2 items'}
      ${0}         | ${'Showing 2 items'}
      ${-1}        | ${'Showing 2 items'}
      ${undefined} | ${'Showing 2 items'}
    `('given $totalItems total items', ({ totalItems, expectedLegend }) => {
      beforeEach(() => {
        createComponent({
          propsData: {
            fetchedItems: 2,
            totalItems,
          },
        });
      });

      it('displays the expected text', () => {
        expect(wrapper.text()).toContain(expectedLegend);
      });
    });
  });

  describe('public methods via $ref', () => {
    it('scrollUp', () => {
      createComponent();
      wrapper.vm.scrollUp();

      expect(mockScrollTo).toHaveBeenCalledWith({ top: ADJUST_SCROLL_GAP });
    });

    it('scrollDown', () => {
      createComponent();
      wrapper.vm.scrollDown();

      expect(mockScrollTo).toHaveBeenCalledWith({ top: INITIAL_HEIGHT - ADJUST_SCROLL_GAP });
    });

    it('scrollTo', () => {
      createComponent();
      wrapper.vm.scrollTo({ top: 250, behavior: 'instant' });

      expect(mockScrollTo).toHaveBeenCalledWith({ top: 250, behavior: 'instant' });
    });
  });
});
