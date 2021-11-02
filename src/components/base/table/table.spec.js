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

  it.each`
    props               | slots            | fullTableShouldExist | lightTableShouldExist | componentToRender
    ${undefined}        | ${undefined}     | ${false}             | ${true}               | ${'GlTableLite'}
    ${{}}               | ${{}}            | ${false}             | ${true}               | ${'GlTableLite'}
    ${{ blah: 'blah' }} | ${undefined}     | ${false}             | ${true}               | ${'GlTableLite'}
    ${{ busy: true }}   | ${undefined}     | ${true}              | ${false}              | ${'GLTable'}
    ${{ busy: true }}   | ${{}}            | ${true}              | ${false}              | ${'GLTable'}
    ${undefined}        | ${slotsTemplate} | ${true}              | ${false}              | ${'GLTable'}
    ${{}}               | ${slotsTemplate} | ${true}              | ${false}              | ${'GLTable'}
    ${{ busy: true }}   | ${slotsTemplate} | ${true}              | ${false}              | ${'GLTable'}
  `(
    'Should render $componentToRender when props are "$props" and slots are "$slots"',
    async ({ props, slots, fullTableShouldExist, lightTableShouldExist }) => {
      factory(props, slots);
      await waitForPromises();

      expect(findTableLite().exists()).toBe(lightTableShouldExist);
      expect(findTable().exists()).toBe(fullTableShouldExist);
    }
  );
});
