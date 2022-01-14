import { GlBreadcrumb } from '../../../../index';
import readme from './breadcrumb.md';

const template = `
    <gl-breadcrumb
        :items="items"
    >
      <template #avatar>
        <img alt=""
            class="gl-breadcrumb-avatar-tile" src="https://assets.gitlab-static.net/uploads/-/system/group/avatar/9970/logo-extra-whitespace.png?width=16"
            width="16"
            height="16" />
      </template>
    </gl-breadcrumb>
  `;

const defaultItems = [
  {
    text: 'First Item',
    href: '#',
  },
  {
    text: 'Second Item',
    href: '#',
  },
  {
    text: 'Third Item',
    href: '#',
  },
  {
    text: 'Fourth Item',
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
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
};

const extraItems = [
  {
    text: 'Fifth Item',
    href: '#',
  },
  {
    text: 'Sixth Item',
    href: '#',
  },
  {
    text: 'Seventh Item',
    href: '#',
  },
  {
    text: 'Eighth Item',
    href: '#',
  },
];

export const CollapsedItems = Template.bind({});
CollapsedItems.args = generateProps({ items: [...defaultItems, ...extraItems] });
