import { GlBreadcrumb } from '../../../../index';
import readme from './breadcrumb.md';

const template = `
    <gl-breadcrumb
        :items="items"
    >
      <template #avatar>
        <img class="gl-breadcrumb-avatar-tile" src="https://assets.gitlab-static.net/uploads/-/system/group/avatar/9970/logo-extra-whitespace.png?width=15" width="15" height="15" />
      </template>
      <template #separator>
        <gl-icon name="angle-right" />
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
