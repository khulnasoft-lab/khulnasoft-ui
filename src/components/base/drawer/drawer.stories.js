import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlButton } from '../../../../index';
import readme from './drawer.md';
import GlDrawer from './drawer.vue';

const components = {
  GlDrawer,
  GlButton,
};

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

const getStory = (template) => ({
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
      open: true,
    };
  },
  components,
  template,
});

documentedStoriesOf('base/drawer', readme)
  .addDecorator(withKnobs)
  .add('default', () =>
    getStory(`
    <div>
      <gl-button @click="toggle">Toggle Drawer</gl-button>
      <gl-drawer :open="open" @close="close">
        <template #title>List Settings</template>
        ${drawerContent}
      </gl-drawer>
    </div>`)
  )
  .add('with actions', () =>
    getStory(`
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
    </div>`)
  )
  .add('sidebar variant', () =>
    getStory(`
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
    </div>`)
  );
