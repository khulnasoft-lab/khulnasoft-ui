import { getA11yParameters } from '../../../utils/stories_utils';
import GlIcon from '../icon/icon.vue';
import BVueReadme from '../../../vendor/bootstrap-vue/src/components/nav/README.md';
import GlNavItem from './nav_item.vue';
import GlNav from './nav.vue';
import readme from './nav.md';

export const Default = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlNav,
    GlNavItem,
    GlIcon,
  },
  template: `
    <div style="height: 150px">
      <gl-nav>
        <gl-nav-item active>Active</gl-nav-item>
        <gl-nav-item>Link</gl-nav-item>
        <gl-nav-item disabled>Disabled</gl-nav-item>
      </gl-nav>
    </div>`,
});

export default {
  title: 'base/nav',
  component: GlNav,
  subcomponents: {
    GlNavItem,
  },
  parameters: {
    a11y: getA11yParameters({ temporarySkipRules: ['link-name'] }),
    bootstrapComponent: 'b-nav',
    bootstrapDocs: BVueReadme,

    docs: {
      description: {
        component: readme,
      },
    },
  },
};
