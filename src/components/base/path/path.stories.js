import GlPopover from '../popover/popover.vue';
import GlPath from './path.vue';
import { mockPathItems } from './data';
import readme from './path.md';

const defaultValue = (prop) => GlPath.props[prop].default;

const generateProps = ({
  items = mockPathItems,
  backgroundColor = defaultValue('backgroundColor'),
} = {}) => ({
  items,
  backgroundColor,
});

const template = (slot = '') => `
  <gl-path :items="items" :background-color="backgroundColor">
    ${slot}
  </gl-path>`;

export const Default = (args, { argTypes }) => ({
  components: { GlPath },
  props: Object.keys(argTypes),
  template: template(),
});
Default.args = generateProps();

export const WithPopovers = (args, { argTypes }) => ({
  components: { GlPath, GlPopover },
  props: Object.keys(argTypes),
  template: template(`
    <template #default="{ pathItem, pathId }">
      <gl-popover triggers="hover" placement="bottom" :target="pathId">
        <template #title>
          {{ pathItem.title }}
        </template>
        {{ pathItem.metric }}
      </gl-popover>
    </template>`),
});
WithPopovers.args = generateProps();

export const AllOptions = () => ({
  components: { GlPath },
  data: () => ({
    items: [
      {
        title: 'First',
        metric: '14d',
        icon: 'home',
      },
      {
        title: 'Second',
        metric: '2d',
      },
    ],
  }),
  template: `<gl-path :items="items" />`,
});
AllOptions.parameters = { controls: { disable: true } };

export default {
  title: 'base/path',
  component: GlPath,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
};
