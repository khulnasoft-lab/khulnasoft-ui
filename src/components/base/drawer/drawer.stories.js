import { GlDrawer, GlButton } from '../../../index';
import readme from './drawer.md';

const components = { GlDrawer, GlButton };

const drawerContent = [
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
]
  .map(
    (str) => `
    <div>
      <label class="gl-font-weight-bold">${str}</label>
      <div>None</div>
    </div>
    `
  )
  .join('');

export const Default = (_args, { viewMode }) => ({
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
  template: `
    <div>
      <gl-button @click="toggle">Toggle Drawer</gl-button>
      <gl-drawer :open="open" @close="close">
        <template #title>List Settings</template>
        ${drawerContent}
      </gl-drawer>
    </div>`,
});

export const WithActions = (_args, { viewMode }) => ({
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
  template: `
    <div>
      <gl-button @click="toggle">Toggle Drawer</gl-button>
      <gl-drawer :open="open" @close="close">
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
      </gl-drawer>
    </div>`,
});

export const SidebarVariant = (_args, { viewMode }) => ({
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
  template: `
    <div>
      <gl-button @click="toggle">Toggle Drawer</gl-button>
      <gl-drawer :open="open" @close="close" variant="sidebar">
        <template #title>
          <h3>Sidebar</h3>
        </template>
        <template #header>
          <div class="gl-mt-5">
            <gl-button>Action</gl-button>
          </div>
        </template>
        ${drawerContent}
      </gl-drawer>
    </div>`,
});

export default {
  title: 'base/drawer',
  component: GlDrawer,
  parameters: {
    knobs: { disabled: true },
    controls: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
