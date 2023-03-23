import avatarPath from '../../../../static/img/avatar.png';
import GlBreadcrumb from './breadcrumb.vue';
import readme from './breadcrumb.md';

const template = `
    <gl-breadcrumb
        :items="items"
    >
      <template #avatar>
        <img alt=""
            class="gl-breadcrumb-avatar-tile" src="${avatarPath}"
            width="16"
            height="16" />
      </template>
    </gl-breadcrumb>
  `;

const defaultItems = [
  {
    text: 'First item',
    href: '#',
  },
  {
    text: 'Second item',
    href: '#',
  },
  {
    text: 'Third item',
    href: '#',
  },
  {
    text: 'Fourth item',
    to: { name: 'fourth-item' },
  },
];

const generateProps = ({ items = defaultItems } = {}) => ({
  items,
});

const Template = (args, { argTypes }) => ({
  components: {
    GlBreadcrumb,
  },
  props: Object.keys(argTypes),
  template,
});
export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/breadcrumb',
  component: GlBreadcrumb,
  parameters: {
    bootstrapComponent: 'b-breadcrumb',
    docs: {
      description: {
        component: readme,
      },
    },
  },
};

const extraItems = [
  {
    text: 'Fifth item',
    href: '#',
  },
  {
    text: 'Sixth item',
    href: '#',
  },
  {
    text: 'Seventh item',
    href: '#',
  },
  {
    text: 'Eighth item',
    href: '#',
  },
];

export const CollapsedItems = Template.bind({});
CollapsedItems.args = generateProps({ items: [...defaultItems, ...extraItems] });
