import readme from './card.md';
import GlCard from './card.vue';

const generateProps = ({ headerClass, bodyClass, footerClass } = {}) => ({
  headerClass,
  bodyClass,
  footerClass,
});

const Template = (args, { argTypes }) => ({
  components: { GlCard },
  props: Object.keys(argTypes),
  template: `
      <gl-card :header-class="headerClass" :body-class="bodyClass" :footer-class="footerClass">
        <template #header>
          <h3 class="gl-my-0 gl-font-weight-bold gl-font-lg">This is a custom header</h3>
        </template>
        <template #default>
          Hello World
        </template>
        <template #footer>
          <span>This is a custom footer</span>
        </template>
      </gl-card>`,
});

export const Default = Template.bind({});
Default.args = generateProps();

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
  argTypes: {
    headerClass: { control: 'text' },
    bodyClass: { control: 'text' },
    footerClass: { control: 'text' },
    header: { control: { disable: true } },
    default: { control: { disable: true } },
    footer: { control: { disable: true } },
  },
};
