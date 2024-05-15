<script>
import GlBadge from '../components/base/badge/badge.vue';
import GlCollapsibleListbox from '../components/base/new_dropdowns/listbox/listbox.vue';
import GlFormInput from '../components/base/form/form_input/form_input.vue';
import GlTable from '../components/base/table/table.vue';
import TOKENS_DEFAULT from './build/json/tokens.json';
import TOKENS_DARK from './build/json/tokens.dark.json';

export default {
  name: 'TokensTable',
  TOKENS_DEFAULT,
  TOKENS_DARK,
  components: {
    GlBadge,
    GlCollapsibleListbox,
    GlFormInput,
    GlTable,
  },
  fields: [
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'value',
      label: 'Value',
    },
  ],
  data() {
    return {
      filter: null,
      modes: [
        {
          value: 'default',
          text: 'Default',
        },
        {
          value: 'dark',
          text: 'Dark',
        },
      ],
      selectedMode: 'default',
      tokens: {
        default: this.$options.TOKENS_DEFAULT,
        dark: this.$options.TOKENS_DARK,
      },
    };
  },
  computed: {
    items() {
      return this.transformTokensToTableRows(this.tokens[this.selectedMode]);
    },
  },
  methods: {
    isColor(type) {
      return type === 'color';
    },
    isAliasValue(value) {
      return typeof value === 'string' && value.includes('{');
    },
    isAliasObject(value) {
      return (
        typeof value === 'object' && Object.values(value).some((val) => this.isAliasValue(val))
      );
    },
    getAliasValueName(value) {
      if (this.isAliasValue(value)) {
        return value.slice(1, -1);
      }
      return value;
    },
    getValueLabel(token) {
      const { value } = token.original;
      if (this.isAliasObject(value)) {
        return this.getAliasValueName(value[this.selectedMode]);
      }
      if (this.isAliasValue(value)) {
        return this.getAliasValueName(value);
      }
      return token.value;
    },
    transformTokenToTableColumns(token) {
      return {
        name: token.path.filter(Boolean).join('.'),
        type: token.$type,
        value: token.value,
        valueLabel: this.getValueLabel(token),
        deprecated: token.deprecated,
        description: token.comment,
      };
    },
    transformTokensToTableRows(tokens) {
      const tokensArray = [];

      Object.keys(tokens).forEach((key) => {
        const token = tokens[key];
        if (token.value) {
          tokensArray.push(this.transformTokenToTableColumns(token));
        } else {
          tokensArray.push(...this.transformTokensToTableRows(token));
        }
      });

      return tokensArray;
    },
  },
};
</script>

<template>
  <div>
    <div class="gl-display-flex gl-align-items-center gl-gap-3 gl-mb-5">
      <gl-form-input v-model="filter" placeholder="Type to search" />
      <gl-collapsible-listbox
        id="component-listbox"
        v-model="selectedMode"
        :selected="selectedMode"
        :items="modes"
        @search="query = $event"
      />
    </div>
    <gl-table
      :filter="filter"
      :items="items"
      :fields="$options.fields"
      :tbody-tr-attr="(item) => ({ id: item.name })"
      hover
      stacked="sm"
    >
      <template #cell(description)="{ item: { name, deprecated, description } }">
        <code class="gl-font-base gl-text-strong">
          {{ name }}
          <gl-badge v-if="deprecated" size="sm" variant="neutral">Deprecated</gl-badge>
        </code>
        <div v-if="description" class="gl-mt-3 gl-text-subtle">
          {{ description }}
        </div>
      </template>
      <template #cell(value)="{ item: { type, value, valueLabel } }">
        <div class="gl-display-flex gl-align-items-center gl-gap-3">
          <div
            v-if="isColor(type)"
            class="gl-w-5 gl-h-5 gl-rounded-base"
            :style="{ 'background-color': value }"
          ></div>
          <code class="gl-font-base gl-text-strong">{{ valueLabel }}</code>
        </div>
      </template>
    </gl-table>
  </div>
</template>
