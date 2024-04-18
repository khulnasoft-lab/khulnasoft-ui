import avatarPath1 from '../../../../static/img/avatar_1.png';
import avatarPath2 from '../../../../static/img/avatar_2.png';
import GlBreadcrumb from './breadcrumb.vue';
import readme from './breadcrumb.md';

const template = `
    <gl-breadcrumb
        :items="items"
        :aria-label="ariaLabel"
        :auto-resize="autoResize"
    />
  `;

const collapsedTemplate = `
  <div style="max-width: 300px">
    <gl-breadcrumb
        :items="items"
        :aria-label="ariaLabel"
        :auto-resize="autoResize"
    />
  </div>
`;

const defaultItems = [
  {
    text: 'First item',
    href: '#',
    avatarPath: avatarPath1,
  },
  {
    text: 'Second item',
    href: '#',
  },
  {
    text: 'Third item',
    href: '#',
    avatarPath: avatarPath2,
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

const CollapsedTemplate = (args, { argTypes }) => ({
  components: {
    GlBreadcrumb,
  },
  props: Object.keys(argTypes),
  template: collapsedTemplate,
});

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

export const CollapsedItems = CollapsedTemplate.bind({});
CollapsedItems.args = generateProps({ items: [...defaultItems, ...extraItems] });
