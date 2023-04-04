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

    expect(findBTable().props().tableClass).toEqual(['gl-table', 'test-class']);
  });
});
