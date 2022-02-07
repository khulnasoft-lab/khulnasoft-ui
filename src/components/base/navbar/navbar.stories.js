import { GlNavbar } from '../../../index';
import readme from './navbar.md';

const Template = (args, { argTypes }) => ({
  components: { GlNavbar },
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
  },
};
