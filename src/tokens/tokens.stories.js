import TokensTable from './tokens_table.vue';

const Template = () => ({
  components: {
    TokensTable,
  },
  template: `<tokens-table />`,
});

export const Default = Template.bind({});

export default {
  title: 'tokens/all',
  component: TokensTable,
  tags: ['skip-visual-test'],
};
