import {
  buttonCategoryOptions,
  buttonSizeOptions,
  buttonVariantOptions,
} from '../../../../utils/constants';
import {
  GlIcon,
  GlListbox,
  GlSearchBoxByType,
  GlButtonGroup,
  GlButton,
  GlAvatar,
} from '../../../../index';
import { makeContainer } from '../../../../utils/story_decorators/container';
import readme from './listbox.md';

const defaultValue = (prop) => GlListbox.props[prop].default;

const defaultItems = [
  {
    value: 'prod',
    text: 'Product',
  },
  {
    value: 'ppl',
    text: 'People',
  },
  {
    value: 'fin',
    text: 'Finance',
  },
  {
    value: 'leg',
    text: 'Legal',
  },
  {
    value: 'eng',
    text: 'Engineering',
  },
  {
    value: 'sales',
    text: 'Sales',
  },
  {
    value: 'marketing',
    text: 'Marketing',
  },
  {
    value: 'acc',
    text: 'Accounting',
  },
  {
    value: 'hr',
    text: 'Human Resource Management',
  },
  {
    value: 'rnd',
    text: 'Research and Development',
  },
  {
    value: 'cust',
    text: 'Customer Service',
  },
  {
    value: 'sup',
    text: 'Support',
  },
];
const generateProps = ({
  items = defaultItems,
  category = defaultValue('category'),
  variant = defaultValue('variant'),
  size = defaultValue('size'),
  disabled = defaultValue('disabled'),
  loading = defaultValue('loading'),
  noCaret = defaultValue('noCaret'),
  right = defaultValue('right'),
  toggleText,
  textSrOnly = defaultValue('textSrOnly'),
  icon = '',
  multiple = defaultValue('multiple'),
  ariaLabelledby,
  startOpened = true,
} = {}) => ({
  items,
  category,
  variant,
  size,
  disabled,
  loading,
  noCaret,
  right,
  toggleText,
  textSrOnly,
  icon,
  multiple,
  ariaLabelledby,
  startOpened,
});

function openListbox(component) {
  component.$nextTick(() => component.$el.querySelector('.dropdown-toggle').click());
}

const template = (content, label = '') => `
  <div>
    ${label}
    <br/>
    <gl-listbox
      v-model="selected"
      :items="items"
      :category="category"
      :variant="variant"
      :size="size"
      :disabled="disabled"
      :loading="loading"
      :no-caret="noCaret"
      :right="right"
      :toggle-text="toggleText"
      :text-sr-only="textSrOnly"
      :icon="icon"
      :multiple="multiple"
      :aria-labelledby="ariaLabelledby"
    >
      ${content}
    </gl-listbox>
  </div>
`;

export const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlListbox,
  },
  data() {
    return {
      selected: defaultItems[1].value,
    };
  },
  mounted() {
    if (this.startOpened) {
      openListbox(this);
    }
  },
  template: template('', `<span class="gl-my-0" id="listbox-label">Select a department</span>`),
});
Default.args = generateProps({ ariaLabelledby: 'listbox-label' });
Default.decorators = [makeContainer({ height: '370px' })];

export const HeaderAndFooter = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlListbox,
    GlSearchBoxByType,
    GlButtonGroup,
    GlButton,
  },
  data() {
    return {
      selected: [],
    };
  },
  mounted() {
    if (this.startOpened) {
      openListbox(this);
    }
  },
  methods: {
    selectItem(index) {
      this.selected.push(defaultItems[index].value);
    },
  },
  template: template(`<template #header>
                                <gl-search-box-by-type/>
                              </template>
                              <template #footer>
                                <div class="gl-border-t-solid gl-border-t-1 gl-border-t-gray-100 gl-display-flex gl-justify-content-center gl-p-3">
                                  <gl-button-group :vertical="false">
                                    <gl-button @click="selectItem(0)">1st</gl-button>
                                    <gl-button @click="selectItem(1)">2nd</gl-button>
                                    <gl-button @click="selectItem(2)">3rd</gl-button>
                                  </gl-button-group>
                                </div>
                              </template>`),
});
HeaderAndFooter.args = generateProps({ toggleText: 'Header and Footer', multiple: true });
HeaderAndFooter.decorators = [makeContainer({ height: '370px' })];

export const CustomListItem = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      selected: ['mikegreiling'],
    };
  },
  components: {
    GlListbox,
    GlIcon,
    GlAvatar,
  },
  mounted() {
    if (this.startOpened) {
      openListbox(this);
    }
  },
  computed: {
    headerText() {
      return this.selected.length !== 1
        ? `${this.selected.length} assignees`
        : this.items.find(({ value }) => value === this.selected[0]).text;
    },
  },
  template: `
      <gl-listbox
        v-model="selected"
        :items="items"
        :category="category"
        :variant="variant"
        :size="size"
        :disabled="disabled"
        :loading="loading"
        :no-caret="noCaret"
        :right="right"
        :toggle-text="headerText"
        :text-sr-only="textSrOnly"
        :icon="icon"
        :multiple="multiple"
        :aria-labelledby="ariaLabelledby"
      >
        <template #list-item="{ item }">
          <span class="gl-display-flex gl-align-items-center">
            <gl-avatar :size="32" class-="gl-mr-3"/>
              <span class="gl-display-flex gl-flex-direction-column">
                <span class="gl-font-weight-bold gl-white-space-nowrap">{{ item.text }}</span>
                <span class="gl-text-gray-400"> {{ item.secondaryText }}</span>
              </span>
          </span>
        </template>
      </gl-listbox>
  `,
});

CustomListItem.args = generateProps({
  items: [
    { value: 'mikegreiling', text: 'Mike Greiling', secondaryText: '@mikegreiling', icon: 'foo' },
    { value: 'ohoral', text: 'Olena Horal-Koretska', secondaryText: '@ohoral', icon: 'bar' },
    { value: 'markian', text: 'Mark Florian', secondaryText: '@markian', icon: 'bin' },
  ],
  multiple: true,
});
CustomListItem.decorators = [makeContainer({ height: '200px' })];

export default {
  title: 'base/new-dropdowns/listbox',
  component: GlListbox,
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    category: {
      control: {
        type: 'select',
        options: buttonCategoryOptions,
      },
    },
    variant: {
      control: {
        type: 'select',
        options: buttonVariantOptions,
      },
    },
    size: {
      control: {
        type: 'select',
        options: buttonSizeOptions,
      },
    },
  },
};
