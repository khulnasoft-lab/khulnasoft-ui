import GlPopover from '../../popover/popover.vue';
import { mockDisclosurePathItems } from '../mock_data';
import readme from '../path.md';
import GlDisclosurePath from './disclosure_path.vue';

const generateProps = ({ items = mockDisclosurePathItems } = {}) => ({
  items,
});

const template = (slot = '') => `
  <gl-disclosure-path :items="items">
    ${slot}
  </gl-disclosure-path>`;

export const Default = (args, { argTypes }) => ({
  components: { GlDisclosurePath },
  props: Object.keys(argTypes),
  template: template(),
});
Default.args = generateProps();

export const WithPopovers = (args, { argTypes }) => ({
  components: { GlDisclosurePath, GlPopover },
  props: Object.keys(argTypes),
  template: template(`
    <template #default="{ pathItem, pathId }">
      <gl-popover triggers="hover" placement="bottom" :target="pathId">
        <template #title>
          {{ pathItem.title }}
        </template>
      </gl-popover>
    </template>`),
});
WithPopovers.args = generateProps();

export const WithEllipsis = (args, { argTypes }) => ({
  components: { GlDisclosurePath },
  props: Object.keys(argTypes),
  template: `<gl-disclosure-path :items="items" :with-ellipsis="true" ellipsis-tooltip-label="Display more items" />`,
});
WithEllipsis.args = generateProps();

export default {
  title: 'base/path/disclosure-path',
  component: GlDisclosurePath,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
