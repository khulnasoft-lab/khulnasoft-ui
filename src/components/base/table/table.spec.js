import { shallowMount } from '@vue/test-utils';
import { logWarning } from '../../../utils/utils';
import { waitForAnimationFrame } from '../../../utils/test_utils';
import { glTableLiteWarning } from './constants';
import Table from './table.vue';

jest.mock('../../../utils/utils', () => ({
  isDev: () => true,
  logWarning: jest.fn(),
}));

describe('GlTable', () => {
  const slotsTemplate = {
    empty: `
      <p>Placeholder empty text</p>`,
  };

  const factory = ({ props = {}, scopedSlots = {} } = {}) => {
    shallowMount(Table, {
      scopedSlots,
      propsData: props,
    });
  };

  afterEach(() => {
    logWarning.mockClear();
  });

  it('should log a warning when not given any props or slots which qualifies for the usage of GlTable', async () => {
    factory();
    await waitForAnimationFrame();

    expect(logWarning).toHaveBeenCalledWith(glTableLiteWarning);
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
});
