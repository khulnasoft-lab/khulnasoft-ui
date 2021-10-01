import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlTable } from '../../../../index';
import { variantOptions } from '../../../utils/constants';
import readme from './table.md';

const components = {
  GlTable,
};

const tableItems = [
  {
    column_one: 'test',
    col_2: 1234,
  },
  {
    column_one: 'test2',
    col_2: 5678,
  },
  {
    column_one: 'test3',
    col_2: 9101,
  },
];

function generateProps() {
  const props = {
    fixed: {
      type: Boolean,
      default: boolean('fixed', false),
    },
    footClone: {
      type: Boolean,
      default: boolean('foot-clone', false),
    },
    stacked: {
      type: [String, Boolean],
      default: select('stacked', ['sm', 'md', 'lg', 'xl', true, false], false),
    },
  };

  return props;
}

documentedStoriesOf('base/table', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    template: `
      <gl-table
        :items="$options.items"
        :fields="$options.fields"
        :fixed="fixed"
        :stacked="stacked"
        :foot-clone="footClone"
        hover
        selectable
        selected-variant="primary"
      />
    `,
    fields: [
      {
        key: 'column_one',
        label: 'Column One',
        variant: select('variant', variantOptions, variantOptions.secondary),
        sortable: boolean('sortable', false),
        isRowHeader: boolean('isRowHeader', false),
      },
      {
        key: 'col_2',
        label: 'Column 2',
        formatter: (value) => `${text('formatterExample', '$')}${value}`,
      },
    ],
    items: tableItems,
  }))
  .add('empty', () => ({
    components,
    template: `
      <gl-table show-empty />
    `,
  }))
  .add('with filter', () => ({
    components,
    template: `<div class="gl-line-height-normal">
      <gl-form-input v-model="filter" placeholder="Type to search" />
      <br />
      <gl-table :items="$options.items" :fields="$options.fields" :filter=filter />
     </div>`,
    items: tableItems,
    data() {
      return {
        filter: null,
      };
    },
  }));
