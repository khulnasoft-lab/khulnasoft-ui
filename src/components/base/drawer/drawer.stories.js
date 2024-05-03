import GlButton from '../button/button.vue';
import GlMarkdown from '../markdown/markdown.vue';
import { drawerVariants } from '../../../utils/constants';
import GlDrawer from './drawer.vue';
import readme from './drawer.md';

const components = { GlDrawer, GlButton, GlMarkdown };

const generateStaticContent = (number = 1) =>
  Array.from(
    Array(number),
    (_, index) => `
      <div class="gl-mb-8">
        <h4 class="gl-mb-4">View jobs in a pipeline ${index}</h4>
        <p>
          Pipeline configuration begins with jobs. Jobs are the most fundamental element of a .gitlab-ci.yml file.
        </p>
        <p>Jobs are:</p>
        <ul>
          <li>Defined with constraints stating under what conditions they should be executed. </li>
          <li>Top-level elements with an arbitrary name and must contain at least the script clause.</li>
          <li>Not limited in how many can be defined.</li>
        </ul>
        <p>For example:</p>
        <gl-markdown compact>
          <code>job1: script: "execute-script-for-job1"</code>
          <br />
          <code>job2: script: "execute-script-for-job2"</code>
        </gl-markdown>
      </div>
    `
  ).join('');

const generateDrawerContent = (items) =>
  items
    .map(
      (str) => `
    <div>
      <label class="gl-font-weight-bold">${str}</label>
      <div>None</div>
    </div>
    `
    )
    .join('');

const drawerContent = generateDrawerContent([
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

const drawerContentShortList = generateDrawerContent(['One', 'Two', 'Three']);

const createSidebarTemplate = (content, { extraBindings = {} } = {}) => `
  <gl-drawer
    :open="open"
    :header-height="headerHeight"
    :header-sticky="headerSticky"
    :z-index="zIndex"
    :variant="variant"
    ${Object.entries(extraBindings)
      .map(([key, value]) => `${key}="${value}"`)
      .join('\n')}
    @close="close">${content}</gl-drawer>
  `;

const defaultValue = (prop) => GlDrawer.props[prop].default;

const generateProps = ({
  headerHeight = defaultValue('headerHeight'),
  headerSticky = defaultValue('headerSticky'),
  zIndex = defaultValue('zIndex'),
  variant = defaultValue('variant'),
} = {}) => ({
  headerHeight,
  headerSticky,
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
  mixins: [
    {
      data() {
        return {
          timesOpened: 0,
        };
      },
      methods: {
        opened() {
          this.timesOpened += 1;
        },
      },
    },
  ],
  ...storyOptions(viewMode),
  template: `
    <div :data-opened-count="timesOpened">
      <gl-button @click="toggle">Toggle Drawer</gl-button>
      ${createSidebarTemplate(
        `
        <template #title>List Settings</template>
        ${drawerContent}
      `,
        { extraBindings: { '@opened': 'opened' } }
      )}
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
          <h3>custom-network-policy multiple lines headline</h3>
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

WithScrimAndStaticContent.args = generateProps({
  headerSticky: true,
});

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

export const StickyHeaderFooter = (_args, { viewMode }) => ({
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
StickyHeaderFooter.args = generateProps({
  headerSticky: true,
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
