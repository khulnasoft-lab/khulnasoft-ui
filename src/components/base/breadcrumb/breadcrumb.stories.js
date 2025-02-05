import avatarPath1 from '../../../../static/img/avatar_1.png';
import avatarPath2 from '../../../../static/img/avatar_2.png';
import { breadCrumbSizeOptions } from '../../../utils/constants';
import GlBreadcrumb from './breadcrumb.vue';
import readme from './breadcrumb.md';

const template = `
    <gl-breadcrumb
        :items="items"
        :aria-label="ariaLabel"
        :auto-resize="autoResize"
        :size="size"
    />
  `;

const collapsedTemplate = `
  <div style="max-width: 300px">
    <gl-breadcrumb
        :items="items"
        :aria-label="ariaLabel"
        :auto-resize="autoResize"
        :size="size"
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

const generateProps = ({ items = defaultItems, ariaLabel, size } = {}) => ({
  items,
  ariaLabel,
  size,
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
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    size: {
      options: Object.keys(breadCrumbSizeOptions),
      control: 'select',
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

export const MediumSize = Template.bind({});
MediumSize.args = generateProps({ items: defaultItems, size: 'md' });

export const CollapsedMediumSize = CollapsedTemplate.bind({});
CollapsedMediumSize.args = generateProps({ items: [...defaultItems, ...extraItems], size: 'md' });
