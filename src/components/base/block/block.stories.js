import { blockVariants } from '../../../utils/constants';
import GlButton from '../button/button.vue';
import GlTable from '../table/table.vue';
import GlForm from '../form/form.vue';
import GlFormGroup from '../form/form_group/form_group.vue';
import GlFormInput from '../form/form_input/form_input.vue';
import GlFormSelect from '../form/form_select/form_select.vue';
import readme from './block.md';
import GlBlock from './block.vue';

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

const template = `
<gl-block
  :variant="variant"
  :title="title"
  :icon="icon"
  :count="count"
  :description="description"
  :action-label="actionLabel"
>
  <template>
    <gl-table
      :items="$options.items"
      stacked="md"
    />
  </template>

  <template #form="{ close }">
    <gl-form>
      <gl-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <gl-form-input
          id="input-1"
          type="email"
          required
          placeholder="Enter email"
        />
      </gl-form-group>

      <gl-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <gl-form-input id="input-2" required placeholder="Enter name" />
      </gl-form-group>

      <gl-form-group id="input-group-3" label="Merge State:" label-for="input-3">
        <gl-form-select id="input-3" :options="states" required />
      </gl-form-group>

      <div class="gl-display-flex">
        <gl-button type="reset" class="gl-mr-3" @click="close">Cancel</gl-button>
        <gl-button type="submit" variant="confirm">Submit</gl-button>
      </div>
    </gl-form>
  </template>

  <template v-if="emptyMessage" #empty>
    {{ emptyMessage }}
  </template>
</gl-block>
`;

const generateProps = ({
  variant = 'default',
  title = 'This is a block title',
  icon = 'issues',
  count = 99,
  description = '',
  actionLabel = 'Add item',
  emptyMessage = '',
} = {}) => ({
  variant,
  title,
  icon,
  count,
  description,
  actionLabel,
  emptyMessage,
});

const Template = (args) => ({
  components: { GlBlock, GlButton, GlTable, GlForm, GlFormGroup, GlFormInput, GlFormSelect },
  data: () => ({
    blockVariants,
  }),
  props: Object.keys(args),
  template,
  items: tableItems,
});

export const Default = Template.bind({});
Default.args = generateProps({ description: 'Block description' });

export const Slots = (args, { argTypes }) => ({
  components: { GlBlock },
  props: Object.keys(argTypes),
  template: `
  <gl-block :variant="variant">
    <template>
    </template>
    <template #header>
      <code>#header</code>
    </template>
    <template #actions>
      <code>#actions</code>
    </template>
    <template>
      <code>#default <i>(Body)</i></code>
    </template>
    <template #form>
      <code>#form</code>
    </template>
    <template #empty>
      <code>#empty</code>
    </template>
    <template #footer>
      <code>#footer</code>
    </template>
  </gl-block>
    `,
});
Slots.args = generateProps({});

export const Empty = (args, { argTypes }) => ({
  components: { GlBlock },
  props: Object.keys(argTypes),
  template,
});
Empty.args = generateProps({ emptyMessage: 'This block is empty.' });

export default {
  title: 'base/block',
  component: GlBlock,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    variant: {
      options: blockVariants,
      control: 'select',
    },
  },
};
