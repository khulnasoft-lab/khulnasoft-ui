import { GlDrawer, GlButton, GlMarkdown } from '../../../index';
import { drawerVariants } from '../../../utils/constants';
import { generateStaticContent, generateContent } from '../../../utils/static_content';
import readme from './drawer.md';

const components = { GlDrawer, GlButton, GlMarkdown };

const drawerContent = generateContent([
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
]);

const drawerContentShortList = generateContent(['One', 'Two', 'Three']);

const createSidebarTemplate = (content) => `
  <gl-drawer
    :open="open"
    :header-height="headerHeight"
    :z-index="zIndex"
    :variant="variant"
    @close="close">${content}</gl-drawer>
  `;

const defaultValue = (prop) => GlDrawer.props[prop].default;

const generateProps = ({
  headerHeight = defaultValue('headerHeight'),
  zIndex = defaultValue('zIndex'),
  variant = defaultValue('variant'),
} = {}) => ({
  headerHeight,
  zIndex,
  variant,
});

const storyOptions = (viewMode) => ({
  props: Object.keys(generateProps()),
  components,
  methods: {
    toggle() {
      this.open = !this.open;
    },
    close() {
      this.open = false;
    },
  },
  data() {
    return {
      open: viewMode !== 'docs',
    };
  },
});

export const Default = (_args, { viewMode }) => ({
  ...storyOptions(viewMode),
  template: `
    <div>
      <gl-button @click="toggle">Toggle Drawer</gl-button>
      ${createSidebarTemplate(`
        <template #title>List Settings</template>
        ${drawerContent}
      `)}
    </div>`,
});
Default.args = generateProps();

export const WithActions = (_args, { viewMode }) => ({
  ...storyOptions(viewMode),
  template: `
    <div>
      <gl-button @click="toggle">Toggle Drawer</gl-button>
      ${createSidebarTemplate(`
          <template #title>
          <h3>custom-network-policy</h3>
        </template>
        <template #header>
            <div class="gl-mt-5">
              <gl-button variant="confirm">Save</gl-button>
              <gl-button class="gl-ml-3" @click="toggle">Cancel</gl-button>
            </div>
        </template>
          ${drawerContent}
      `)}
    </div>`,
});
WithActions.args = generateProps();

export const WithStickyFooterShortContent = (_args, { viewMode }) => ({
  ...storyOptions(viewMode),
  template: `
    <div>
      <gl-button @click="toggle">Toggle Drawer</gl-button>
      ${createSidebarTemplate(`
        <template #title>List Settings</template>
        ${drawerContentShortList}
        <template #footer>
          Drawer footer
        </template>
      `)}
    </div>`,
});

WithStickyFooterShortContent.args = generateProps();

export const WithStickyFooter = (_args, { viewMode }) => ({
  ...storyOptions(viewMode),
  template: `
    <div>
      <gl-button @click="toggle">Toggle Drawer</gl-button>
      ${createSidebarTemplate(`
        <template #title>List Settings</template>
        ${drawerContent}
        <template #footer>
          Drawer footer
        </template>
      `)}
    </div>`,
});

WithStickyFooter.args = generateProps();

export const WithScrimAndStaticContent = (_args, { viewMode }) => ({
  ...storyOptions(viewMode),
  template: `
    <div>
      <gl-button @click="toggle">Toggle Drawer</gl-button>
      ${createSidebarTemplate(`
        <template #title>List Settings</template>
        <div>
          ${generateStaticContent(3)}
        </div>
      `)}
    </div>`,
});

WithScrimAndStaticContent.args = generateProps();

export const SidebarVariant = (_args, { viewMode }) => ({
  ...storyOptions(viewMode),
  template: `
    <div>
      <gl-button @click="toggle">Toggle Drawer</gl-button>
      ${createSidebarTemplate(`
        <template #title>
          <h3>Sidebar</h3>
        </template>
        <template #header>
          <div class="gl-mt-5">
            <gl-button>Action</gl-button>
          </div>
        </template>
        ${drawerContent}
      `)}
    </div>`,
});

SidebarVariant.args = generateProps({
  variant: drawerVariants.sidebar,
});

export default {
  title: 'base/drawer',
  component: GlDrawer,
  argTypes: {
    open: {
      control: false,
    },
    variant: {
      options: Object.keys(drawerVariants),
      control: 'select',
    },
  },
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
