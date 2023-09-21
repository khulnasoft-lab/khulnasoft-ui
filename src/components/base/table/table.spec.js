import { shallowMount } from '@vue/test-utils';
import { BTable } from 'bootstrap-vue';
import { logWarning } from '../../../utils/utils';
import { waitForAnimationFrame } from '../../../utils/test_utils';
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

  const factory = ({ props = {}, scopedSlots = {} } = {}) => {
    wrapper = shallowMount(Table, {
      scopedSlots,
      propsData: props,
    });
  };

  const findBTable = () => wrapper.findComponent(BTable);

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

  it('should render column headers using generic labels', () => {

    const columns = [
      {label: 'Column 1'},
      {label: 'Column 2'}
    ];
  
    const wrapper = shallowMount(Table, {
      propsData: {
        columns 
      }
    });
  
    const headers = wrapper.findAll('th');
  
    expect(headers[0].text()).toBe('Column 1');
    expect(headers[1].text()).toBe('Column 2');
  
  });
});
