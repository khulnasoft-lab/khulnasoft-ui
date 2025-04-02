import { getA11yParameters } from '../../../utils/stories_utils';
import GlIcon from '../icon/icon.vue';
import GlNavItem from './nav_item.vue';
import GlNav from './nav.vue';
import readme from './nav.md';

const generateProps = ({
  align = '',
  fill = false,
  justified = false,
  pills = false,
  small = false,
  tabs = false,
} = {}) => ({
  align,
  fill,
  justified,
  pills,
  small,
  tabs,
});

export const Default = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlNav,
    GlNavItem,
    GlIcon,
  },
  template: `
    <div style="height: 150px">
      <gl-nav
        :align="align"
        :fill="fill"
        :justified="justified"
        :pills="pills"
        :small="small"
        :tabs="tabs"
      >
        <gl-nav-item active href='#foo'>Active</gl-nav-item>
        <gl-nav-item href='#bar'>Link</gl-nav-item>
        <gl-nav-item disabled href='https://gitlab.com'>Disabled</gl-nav-item>
      </gl-nav>
    </div>`,
});

Default.args = generateProps();

export default {
  title: 'base/nav',
  component: GlNav,
  subcomponents: {
    GlNavItem,
  },
  parameters: {
    a11y: getA11yParameters({ temporarySkipRules: ['link-name'] }),
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    align: {
      options: ['left', 'center', 'right'],
      control: 'select',
    },
  },
};
