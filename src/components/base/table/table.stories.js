import GlFormInput from '../form/form_input/form_input.vue';
import GlTable from './table.vue';
import readme from './table.md';

const components = { GlTable };

const tableItems = [
  {
    column_one: 'test',
    col_2: 'ABC',
    col_three: 1234,
  },
  {
    column_one: 'test2',
    col_2: 'DEF',
    col_three: 5678,
  },
  {
    column_one: 'test3',
    col_2: 'GHI',
    col_three: 9101,
  },
];

const generateProps = ({
  stickyHeader = false,
  fixed = false,
  footClone = false,
  stacked = false,
  caption = '',
} = {}) => ({
  stickyHeader,
  fixed,
  footClone,
  stacked,
  caption,
});

export const Default = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  template: `
  <gl-table
    :sticky-header="stickyHeader"
    :items="$options.items"
    :fields="$options.fields"
    :fixed="fixed"
    :stacked="stacked"
    :foot-clone="footClone"
    sort-by="col_three"
    sort-desc
    no-sort-reset
    sort-direction="desc"
    hover
    selectable
    selected-variant="primary"
  >
    <template v-if="caption" #table-caption>
      {{ caption }}
    </template>
  </gl-table>
`,
  fields: [
    {
      key: 'column_one',
      label: 'First column',
      variant: 'secondary',
      sortable: true,
      isRowHeader: false,
    },
    {
      key: 'col_2',
      label: 'Second column',
      formatter: (value) => value,
    },
    {
      key: 'col_three',
      sortable: true,
      label: 'Third column',
      formatter: (value) => value,
      thClass: 'gl-text-right',
      tdClass: 'gl-text-right',
    },
  ],
  items: tableItems,
});
Default.args = generateProps();

export const Empty = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  template: `
      <gl-table show-empty />
    `,
});
Empty.parameters = { controls: { disable: true } };

export const WithFilter = (args, { argTypes }) => ({
  components: { ...components, GlFormInput },
  props: Object.keys(argTypes),
  template: `<div class="gl-line-height-normal">
      <gl-form-input v-model="filter" placeholder="Type to search" />
      <br />
      <gl-table
              :sticky-header="stickyHeader"
              :items="$options.items"
              :fields="$options.fields"
              :filter=filter
              :fixed="fixed"
              :stacked="stacked"
              :foot-clone="footClone"
              hover
              selectable
              selected-variant="primary"
          />
      </div>`,
  items: tableItems,
  data() {
    return {
      filter: null,
    };
  },
});
WithFilter.args = generateProps();

export const WithStickyHeader = (args, { argTypes }) => ({
  components: { ...components, GlFormInput },
  props: Object.keys(argTypes),
  template: `<div class="gl-line-height-normal">
      <gl-form-input v-model="filter" placeholder="Type to search" />
      <br />
      <gl-table
              :sticky-header="stickyHeader"
              :items="$options.items"
              :fields="$options.fields"
              :filter=filter
              :fixed="fixed"
              :stacked="stacked"
              :foot-clone="footClone"
              hover
              selectable
              selected-variant="primary"
          />
      </div>`,
  items: [
    ...tableItems,
    ...tableItems,
    ...tableItems,
    ...tableItems,
    ...tableItems,
    ...tableItems,
    ...tableItems,
    ...tableItems,
    ...tableItems,
    ...tableItems,
  ],
  data() {
    return {
      filter: null,
    };
  },
});
WithStickyHeader.args = generateProps({ stickyHeader: true });

export default {
  title: 'base/table/table',
  component: GlTable,
  parameters: {
    bootstrapComponent: 'b-table',
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    stacked: {
      options: ['sm', 'md', 'lg', 'xl', true, false],
      control: 'select',
    },
    stickyHeader: {
      options: [false, true],
      control: 'boolean',
    },
  },
};
