import GlToken from '../../token/token.vue';
import readme from './form_checkbox_tree.md';
import GlFormCheckboxTree from './form_checkbox_tree.vue';

const components = {
  GlFormCheckboxTree,
  GlToken,
};

const defaultOptions = [
  {
    value: 1,
    label: 'Felidae',
    children: [
      {
        value: 11,
        label: 'Lion',
      },
      {
        value: 12,
        label: 'Felinae',
        children: [
          {
            value: 121,
            label: 'Cheetah',
          },
          {
            value: 122,
            label: 'Ocelot',
          },
        ],
      },
    ],
  },
  {
    value: 2,
    label: 'Canidae',
    children: [
      {
        value: 21,
        label: 'Caninae',
        children: [
          {
            value: 211,
            label: 'Canis lupus',
            children: [
              {
                value: 2112,
                label: 'Wolf',
              },
              {
                value: 2113,
                label: 'Himalayan wolf',
              },
              {
                value: 2114,
                label: 'Dingo',
              },
            ],
          },
          {
            value: 212,
            label: 'Black-backed jackal',
          },
        ],
      },
      {
        value: 22,
        label: 'Fennec fox',
      },
    ],
  },
  {
    value: 3,
    label: 'Karabair',
  },
  {
    value: 4,
    label: 'Okapi',
  },
];

const defaultValue = (prop) => GlFormCheckboxTree.props[prop].default;

const generateProps = ({
  options = defaultOptions,
  hideToggleAll = defaultValue('hideToggleAll'),
  selectAllLabel = defaultValue('selectAllLabel'),
  unselectAllLabel = defaultValue('unselectAllLabel'),
  label = defaultValue('label'),
  labelSrOnly = defaultValue('labelSrOnly'),
} = {}) => ({
  options,
  hideToggleAll,
  selectAllLabel,
  unselectAllLabel,
  label,
  labelSrOnly,
});

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data: () => ({
    checked: [1, 11, 12, 121, 122, 2113, 3],
  }),
  components,
  template: `
    <div>
      <gl-form-checkbox-tree
        v-model="checked"
        :options="options"
        :hide-toggle-all="hideToggleAll"
        :select-all-label="selectAllLabel"
        :unselect-all-label="unselectAllLabel"
        :label="label"
        :label-sr-only="labelSrOnly" />
      Selected options:
      <gl-token v-for="value in checked" :key="value" class="gl-mr-1" view-only>{{ value }}</gl-token>
    </div>
  `,
});
Default.args = generateProps();

export default {
  title: 'base/form/form-checkbox-tree',
  component: GlFormCheckboxTree,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
