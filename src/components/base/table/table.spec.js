import { nextTick } from 'vue';
import { shallowMount, mount } from '@vue/test-utils';
import { BTable } from 'bootstrap-vue';
import { logWarning } from '../../../utils/utils';
import { waitForAnimationFrame } from '../../../utils/test_utils';
import Icon from '../icon/icon.vue';
import { glTableLiteWarning } from './constants';
import Table from './table.vue';

jest.mock('../../../utils/utils', () => ({
  isDev: () => true,
  logWarning: jest.fn(),
}));

describe('GlTable', () => {
  let wrapper;

  const slotsTemplate = {
    empty: `
      <p>Placeholder empty text</p>`,
  };

  const factory = ({ mountFn = shallowMount, props = {}, scopedSlots = {} } = {}) => {
    wrapper = mountFn(Table, {
      scopedSlots,
      propsData: props,
    });
  };

  const findBTable = () => wrapper.findComponent(BTable);
  const findFirstColHeader = () => findBTable().find('thead').findAll('th').at(0);

  afterEach(() => {
    logWarning.mockClear();
  });

  it('should log a warning when not given any props or slots which qualifies for the usage of GlTable', async () => {
    factory();
    await waitForAnimationFrame();

    expect(logWarning).toHaveBeenCalledWith(glTableLiteWarning, wrapper.element);
  });

  it('should not log a warning when given a prop which qualifies for the usage of GlTable', async () => {
    factory({ props: { busy: true } });
    await waitForAnimationFrame();

    expect(logWarning).not.toHaveBeenCalled();
  });

  it('should not log a warning when given a slot which qualifies for the usage of GlTable', async () => {
    factory({ scopedSlots: slotsTemplate });
    await waitForAnimationFrame();

    expect(logWarning).not.toHaveBeenCalled();
  });

  it('adds gl-table class to tableClass prop', () => {
    factory({ props: { tableClass: 'test-class' } });

    expect(findBTable().props().tableClass).toEqual(['gl-table', 'test-class', null]);
  });

  it('adds sticky header class to tableClass prop', () => {
    factory({ props: { stickyHeader: true } });

    expect(findBTable().props().tableClass).toEqual([
      'gl-table',
      undefined,
      'gl-table--sticky-header',
    ]);
  });

  it('adds gl-table fields to table prop', () => {
    const fields = ['name', 'age'];

    factory({ props: { fields } });

    expect(wrapper.props('fields')).toEqual(fields);
    expect(findBTable().props('fields')).toEqual(fields);
  });

  describe('sortable columns', () => {
    const field = {
      key: 'name',
      label: 'Name column',
      sortable: true,
    };

    describe('without custom slots', () => {
      beforeEach(() => {
        factory({ mountFn: mount, props: { fields: [field] } });
      });

      it('sets the correct column label', () => {
        expect(findFirstColHeader().text()).toMatch(field.label);
      });

      it('renders the ascending sort icon', async () => {
        findFirstColHeader().trigger('click');
        await nextTick();

        const icon = findFirstColHeader().findComponent(Icon);

        expect(icon.exists()).toBe(true);
        expect(icon.props('name')).toBe('arrow-up');
      });

      it('renders the descending sort icon', async () => {
        findFirstColHeader().trigger('click');
        findFirstColHeader().trigger('click');
        await nextTick();
        const icon = findFirstColHeader().findComponent(Icon);

        expect(icon.exists()).toBe(true);
        expect(icon.props('name')).toBe('arrow-down');
      });
    });

    describe('when headers are customized via slots', () => {
      const customSlotContent = 'customSlotContent';

      beforeEach(() => {
        factory({
          mountFn: mount,
          props: {
            fields: [field],
          },
          scopedSlots: {
            'head(name)': `<div>${customSlotContent}</div>`,
          },
        });
      });

      it('renders the ascending sort icon alongside the custom slot content', async () => {
        findFirstColHeader().trigger('click');
        await nextTick();

        const icon = findFirstColHeader().findComponent(Icon);

        expect(icon.exists()).toBe(true);
        expect(icon.props('name')).toBe('arrow-up');
        expect(findFirstColHeader().text()).toContain(customSlotContent);
      });
    });
  });
});
