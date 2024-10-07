import { BNavbarBrand } from '../../../vendor/bootstrap-vue/src/components/navbar/navbar-brand';
import BVueReadme from '../../../vendor/bootstrap-vue/src/components/navbar/README.md';
import GlNavbar from './navbar.vue';
import readme from './navbar.md';

const Template = (args, { argTypes }) => ({
  components: { GlNavbar, BNavbarBrand },
  props: Object.keys(argTypes),
  template: `
  <gl-navbar variant="dark" type="dark">
    <b-navbar-brand tag="h1" class="mb-0">Gitlab</b-navbar-brand>
  </gl-navbar>
  `,
});

export const Default = Template.bind({});

export default {
  title: 'base/navbar',
  component: GlNavbar,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
    bootstrapComponent: 'b-navbar',
    bootstrapDocs: BVueReadme,
  },
};
