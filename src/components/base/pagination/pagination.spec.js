import { mount } from '@vue/test-utils';
import debounce from 'lodash/debounce';
import { breakpoints } from '~/utils/breakpoints';
import Pagination from './pagination.vue';

jest.mock('lodash/debounce', () => jest.fn((fn) => fn));

const expectClassActive = expect.arrayContaining(['active']);
const mockResizeWidth = (width) => {
  window.innerWidth = width;
  const resizeEvent = document.createEvent('Event');
  resizeEvent.initEvent('resize', true, true);
  window.dispatchEvent(resizeEvent);
};

describe('pagination component', () => {
  let wrapper;
  const findButtons = () => wrapper.findAll('.page-link');
  const findItems = () => wrapper.findAll('.page-item');
  const propsData = {
    value: 3,
    perPage: 5,
    totalItems: 30,
  };
  const createComponent = (props = propsData, options = {}) => {
    wrapper = mount(Pagination, {
      propsData: {
        itemsPerPage: 20,
        ...props,
      },
      ...options,
    });
  };

  afterEach(() => {
    debounce.mockClear();
  });

  it('should change pagination limits on resize', () => {
    createComponent();

    mockResizeWidth(breakpoints.sm);
    expect(wrapper.vm.paginationLimit).toBe(0);
    expect(wrapper.vm.maxAdjacentPages).toBe(0);

    mockResizeWidth(breakpoints.md);
    expect(wrapper.vm.paginationLimit).toBe(3);
    expect(wrapper.vm.maxAdjacentPages).toBe(1);

    mockResizeWidth(breakpoints.lg);
    expect(wrapper.vm.paginationLimit).toBe(9);
    expect(wrapper.vm.maxAdjacentPages).toBe(4);

    mockResizeWidth(breakpoints.xl);
    expect(wrapper.vm.paginationLimit).toBe(9);
    expect(wrapper.vm.maxAdjacentPages).toBe(4);
  });

  it('should not render when one page fits all items', async () => {
    createComponent({
      ...propsData,
      totalItems: 5,
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toBe('');
  });

  it('supports slots customization', () => {
    createComponent(
      {
        ...propsData,
        value: 8,
        totalItems: 75,
      },
      {
        slots: {
          previous: '<span>custom_prev_slot</span>',
          next: '<span>custom_next_slot</span>',
          'ellipsis-left': '<span>custom_ellipsis_left_slot</span>',
          'ellipsis-right': '<span>custom_ellipsis_right_slot</span>',
        },
        scopedSlots: {
          'page-number': '<span slot-scope="{ page }">custom_page_number_slot_{{ page }}</span>',
        },
      }
    );
    const buttons = findButtons();
    expect(buttons.at(0).text()).toBe('custom_prev_slot');
    expect(buttons.at(1).text()).toBe('custom_page_number_slot_1');
    expect(buttons.at(2).text()).toBe('custom_ellipsis_left_slot');
    expect(buttons.at(7).text()).toBe('custom_page_number_slot_8');
    expect(buttons.at(buttons.length - 3).text()).toBe('custom_ellipsis_right_slot');
    expect(buttons.at(buttons.length - 2).text()).toBe('custom_page_number_slot_15');
    expect(buttons.at(buttons.length - 1).text()).toBe('custom_next_slot');
  });

  it('sets links href properly in link-based mode', () => {
    createComponent({
      ...propsData,
      linkGen: (page) => `#page${page}`,
    });
    const buttons = findButtons();
    expect(buttons.at(1).attributes('href')).toBe('#page1');
  });

  it('emits input event when page changes', () => {
    createComponent({
      ...propsData,
      value: 1,
      totalItems: 75,
    });
    const buttons = findButtons();
    const nextButton = buttons.at(buttons.length - 1);
    nextButton.trigger('click');

    expect(wrapper.emitted('input')).toHaveLength(1);
    expect(wrapper.emitted('input')[0]).toEqual([2]);
  });

  it('emits previous event when previous button is clicked', () => {
    createComponent({
      ...propsData,
      value: 1,
      totalItems: 75,
    });

    findButtons().at(0).trigger('click');

    expect(wrapper.emitted('previous')).toEqual([[]]);
  });

  it('emits next event when next button is clicked', () => {
    createComponent({
      ...propsData,
      value: 1,
      totalItems: 75,
    });

    const buttons = findButtons();
    const nextButton = buttons.at(buttons.length - 1);
    nextButton.trigger('click');

    expect(wrapper.emitted('next')).toEqual([[]]);
  });

  it('does not prevent link events in link-based mode', () => {
    createComponent({
      ...propsData,
      linkGen: (page) => `#page${page}`,
    });

    const clickEvent = new MouseEvent('click');
    clickEvent.preventDefault = jest.fn();

    const nextButton = findButtons().at(1);
    nextButton.element.dispatchEvent(clickEvent);

    expect(clickEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('disables all items if disabled prop is true', () => {
    createComponent({
      ...propsData,
      disabled: true,
    });

    expect(findButtons().wrappers.every((w) => w.element.tagName === 'SPAN')).toBe(true);
  });

  describe('with a total of 4 pages and 3rd page active', () => {
    beforeEach(() => {
      mockResizeWidth(breakpoints.lg);
      createComponent({
        ...propsData,
        totalItems: 20,
      });
    });

    it('shows 3rd page as active and enables all buttons', () => {
      const buttons = findButtons();
      expect(buttons.at(3).classes()).toEqual(expectClassActive);
      expect(buttons.at(3).attributes('aria-current')).toEqual('page');
      buttons.wrappers.forEach((button) => {
        expect(button.element.tagName).not.toBe('SPAN');
      });
    });

    it('shows all pages on desktop', () => {
      const buttons = findButtons();
      expect(buttons.length).toBe(6);
      expect(buttons.at(0).text()).toBe(wrapper.vm.prevText);
      expect(buttons.at(1).text()).toBe('1');
      expect(buttons.at(2).text()).toBe('2');
      expect(buttons.at(3).text()).toBe('3');
      expect(buttons.at(4).text()).toBe('4');
      expect(buttons.at(5).text()).toBe(wrapper.vm.nextText);
    });

    it('shows all pages mobile', () => {
      mockResizeWidth(breakpoints.sm);
      const buttons = findButtons();
      expect(buttons.length).toBe(6);
      expect(buttons.at(0).text()).toBe(wrapper.vm.prevText);
      expect(buttons.at(1).text()).toBe('1');
      expect(buttons.at(2).text()).toBe('2');
      expect(buttons.at(3).text()).toBe('3');
      expect(buttons.at(4).text()).toBe('4');
      expect(buttons.at(5).text()).toBe(wrapper.vm.nextText);
    });
  });

  describe('with a total of 15 pages and first page active', () => {
    beforeEach(() => {
      mockResizeWidth(breakpoints.lg);
      createComponent({
        ...propsData,
        value: 1,
        totalItems: 75,
      });
    });

    it('shows 1st page as active and disables previous button', () => {
      const buttons = findButtons();
      expect(buttons.at(0).element.tagName).toBe('SPAN');
      expect(buttons.at(1).classes()).toEqual(expectClassActive);
      expect(buttons.at(1).attributes('aria-current')).toEqual('page');
      expect(buttons.at(buttons.length - 1).element.tagName).not.toBe('SPAN');
    });

    it('shows first 5 pages and collapses right side on desktop', () => {
      const buttons = findButtons();
      expect(buttons.length).toBe(9);
      expect(buttons.at(0).text()).toBe(wrapper.vm.prevText);
      expect(buttons.at(1).text()).toBe('1');
      expect(buttons.at(2).text()).toBe('2');
      expect(buttons.at(3).text()).toBe('3');
      expect(buttons.at(4).text()).toBe('4');
      expect(buttons.at(5).text()).toBe('5');
      expect(buttons.at(6).text()).toBe(wrapper.vm.ellipsisText);
      expect(buttons.at(7).text()).toBe('15');
      expect(buttons.at(8).text()).toBe(wrapper.vm.nextText);
    });

    it('shows first 2 pages and collapses right side mobile', async () => {
      mockResizeWidth(breakpoints.sm);

      await wrapper.vm.$nextTick();

      const buttons = findButtons();
      expect(buttons.length).toBe(6);
      expect(buttons.at(0).text()).toBe(wrapper.vm.prevText);
      expect(buttons.at(1).text()).toBe('1');
      expect(buttons.at(2).text()).toBe('2');
      expect(buttons.at(3).text()).toBe(wrapper.vm.ellipsisText);
      expect(buttons.at(4).text()).toBe('15');
      expect(buttons.at(5).text()).toBe(wrapper.vm.nextText);
    });
  });

  describe('with a total of 15 pages and 8th page active', () => {
    beforeEach(() => {
      mockResizeWidth(breakpoints.lg);
      createComponent({
        ...propsData,
        value: 8,
        totalItems: 75,
      });
    });

    it('shows pages 4 to 12 and collapses both sides on desktop', () => {
      const buttons = findButtons();
      expect(buttons.length).toBe(15);
      expect(buttons.at(0).text()).toBe(wrapper.vm.prevText);
      expect(buttons.at(1).text()).toBe('1');
      expect(buttons.at(2).text()).toBe(wrapper.vm.ellipsisText);
      expect(buttons.at(3).text()).toBe('4');
      expect(buttons.at(7).text()).toBe('8');
      expect(buttons.at(11).text()).toBe('12');
      expect(buttons.at(12).text()).toBe(wrapper.vm.ellipsisText);
      expect(buttons.at(13).text()).toBe('15');
      expect(buttons.at(14).text()).toBe(wrapper.vm.nextText);
    });

    it('shows page 8 and collapses both sides on mobile', async () => {
      mockResizeWidth(breakpoints.sm);

      await wrapper.vm.$nextTick();

      const buttons = findButtons();
      expect(buttons.length).toBe(7);
      expect(buttons.at(0).text()).toBe(wrapper.vm.prevText);
      expect(buttons.at(1).text()).toBe('1');
      expect(buttons.at(2).text()).toBe(wrapper.vm.ellipsisText);
      expect(buttons.at(3).text()).toBe('8');
      expect(buttons.at(4).text()).toBe(wrapper.vm.ellipsisText);
      expect(buttons.at(5).text()).toBe('15');
      expect(buttons.at(6).text()).toBe(wrapper.vm.nextText);
    });
  });

  describe('with a total of 15 pages and 15th page active', () => {
    beforeEach(() => {
      mockResizeWidth(breakpoints.lg);
      createComponent({
        ...propsData,
        value: 15,
        totalItems: 75,
      });
    });

    it('shows 15th page as active and disables next button', () => {
      const buttons = findButtons();
      expect(buttons.at(0).element.tagName).not.toBe('SPAN');
      expect(buttons.at(7).classes()).toEqual(expectClassActive);
      expect(buttons.at(7).attributes('aria-current')).toEqual('page');
      expect(buttons.at(buttons.length - 1).element.tagName).toBe('SPAN');
    });

    it('shows pages 11 to 15 and collapses left side on desktop', () => {
      const buttons = findButtons();
      expect(buttons.length).toBe(9);
      expect(buttons.at(0).text()).toBe(wrapper.vm.prevText);
      expect(buttons.at(1).text()).toBe('1');
      expect(buttons.at(2).text()).toBe(wrapper.vm.ellipsisText);
      expect(buttons.at(3).text()).toBe('11');
      expect(buttons.at(4).text()).toBe('12');
      expect(buttons.at(5).text()).toBe('13');
      expect(buttons.at(6).text()).toBe('14');
      expect(buttons.at(7).text()).toBe('15');
      expect(buttons.at(8).text()).toBe(wrapper.vm.nextText);
    });

    it('shows pages 14 to 15 and collapses left side on mobile', async () => {
      mockResizeWidth(breakpoints.sm);

      await wrapper.vm.$nextTick();

      const buttons = findButtons();
      expect(buttons.length).toBe(6);
      expect(buttons.at(0).text()).toBe(wrapper.vm.prevText);
      expect(buttons.at(1).text()).toBe('1');
      expect(buttons.at(2).text()).toBe(wrapper.vm.ellipsisText);
      expect(buttons.at(3).text()).toBe('14');
      expect(buttons.at(4).text()).toBe('15');
      expect(buttons.at(5).text()).toBe(wrapper.vm.nextText);
    });
  });

  describe('compact navigation', () => {
    const compactPropsData = {
      ...propsData,
      totalItems: 0,
    };

    it.each`
      props                           | description
      ${{ prevPage: 2 }}              | ${'is a previous page'}
      ${{ nextPage: 2 }}              | ${'is a next page'}
      ${{ prevPage: 2, nextPage: 4 }} | ${'are previous and next pages'}
    `(
      `renders only prev & next buttons when totalItems isn's provided and there $description`,
      ({ props }) => {
        createComponent({
          ...compactPropsData,
          ...props,
        });
        const buttons = findButtons();
        expect(buttons.length).toBe(2);
      }
    );

    it('disables prev button when on first page', () => {
      createComponent({
        ...compactPropsData,
        value: 1,
        nextPage: 2,
      });
      const prevItem = findItems().at(0);
      expect(prevItem.attributes('aria-hidden')).toBe('true');
      const prevButton = findButtons().at(0);
      expect(prevButton.element.tagName).toBe('SPAN');
      expect(prevButton.attributes('href')).toBeUndefined();
      expect(prevButton.attributes('aria-label')).toBeUndefined();
    });

    it('disables next button when on last page', () => {
      createComponent({
        ...compactPropsData,
        value: 2,
        prevPage: 1,
      });
      const nextItem = findItems().at(1);
      expect(nextItem.attributes('aria-hidden')).toBe('true');
      const nextButton = findButtons().at(1);
      expect(nextButton.element.tagName).toBe('SPAN');
      expect(nextButton.attributes('href')).toBeUndefined();
      expect(nextButton.attributes('aria-label')).toBeUndefined();
    });
  });
});
