import readme from './card.md';
import GlCard from './card.vue';

const components = {
  GlCard,
};

const template = `
<gl-card>
  <template #header>
    <h3 class="gl-my-0 gl-font-weight-bold gl-font-lg">This is a custom header</h3>
  </template>
  <template #default>
    Hello World
  </template>
  <template #footer>
    <span>This is a custom footer</span>
  </template>
</gl-card>`;

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  template,
});

export const Default = Template.bind({});

export default {
  title: 'base/card',
  component: GlCard,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
