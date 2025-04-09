import TokensTailwindTable from './tokens_tailwind_table.vue';

const Template = () => ({
  components: {
    TokensTailwindTable,
  },
  template: `<tokens-tailwind-table />`,
});

export const Default = Template.bind({});

export default {
  title: 'tokens/tailwind',
  component: TokensTailwindTable,
  tags: ['skip-visual-test'],
};
