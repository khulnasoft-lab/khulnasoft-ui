import { shallowMount } from '@vue/test-utils';
import FullTable from './full_table';
import Table from './table.vue';
import TableLite from './table_lite';

const waitForPromises = () => new Promise((resolve) => requestAnimationFrame(resolve));

describe('GlTable', () => {
  let wrapper;

  const slotsTemplate = {
    empty: `
      <p>Placeholder empty text</p>`,
  };

  const factory = (props = {}, scopedSlots = {}) => {
    wrapper = shallowMount(Table, {
      propsData: {
        ...props,
      },
      scopedSlots,
    });
  };

  const findTable = () => wrapper.findComponent(FullTable);
  const findTableLite = () => wrapper.findComponent(TableLite);

  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  it('should render GlTableLite when not given any props or slots which require a GlTable', async () => {
    factory();
    await waitForPromises();

    expect(findTableLite().exists()).toBe(true);
    expect(findTable().exists()).toBe(false);
  });

  it('should render GLTable when given a prop that qualifies for it', async () => {
    factory({ busy: true });
    await waitForPromises();

    expect(findTable().exists()).toBe(true);
    expect(findTableLite().exists()).toBe(false);
  });

  it('should render GLTable when given a slot that qualifies for it', async () => {
    factory({}, slotsTemplate);
    await waitForPromises();

    expect(findTable().exists()).toBe(true);
    expect(findTableLite().exists()).toBe(false);
  });
});
