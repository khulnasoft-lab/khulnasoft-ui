<script>
import Fuse from 'fuse.js';
import GlBadge from '../components/base/badge/badge.vue';
import GlButton from '../components/base/button/button.vue';
import GlCollapsibleListbox from '../components/base/new_dropdowns/listbox/listbox.vue';
import GlSearchBoxByType from '../components/base/search_box_by_type/search_box_by_type.vue';
import GlLink from '../components/base/link/link.vue';
import GlTable from '../components/base/table/table.vue';
import GlPagination from '../components/base/pagination/pagination.vue';
import { GlTooltipDirective } from '../directives/tooltip/tooltip';
import TOKENS_DEFAULT from './build/json/tokens.json';
import TOKENS_DARK from './build/json/tokens.dark.json';

export default {
  name: 'TokensTable',
  tokens: {
    default: TOKENS_DEFAULT,
    dark: TOKENS_DARK,
  },
  components: {
    GlBadge,
    GlButton,
    GlCollapsibleListbox,
    GlSearchBoxByType,
    GlLink,
    GlTable,
    GlPagination,
  },
  directives: {
    GlTooltip: GlTooltipDirective,
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
      filter: '',
      platforms: [
        {
          value: 'name',
          text: 'Name',
        },
        {
          value: 'figma',
          text: 'Figma',
        },
        {
          value: 'css',
          text: 'CSS',
        },
        {
          value: 'scss',
          text: 'SCSS',
        },
      ],
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
      selectedPlatform: 'name',
      selectedMode: 'default',
      currentPage: 1,
      perPage: 50,
      totalFilteredItems: 0,
    };
  },
  watch: {
    selectedPlatform: 'refresh',
    selectedMode: 'refresh',
    filter: 'resetCurrentPage',
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
      const value = token.original.$value;
      if (this.isAliasObject(value)) {
        return this.getAliasValueName(value[this.selectedMode]);
      }
      if (this.isAliasValue(value)) {
        return this.getAliasValueName(value);
      }
      return token.$value;
    },
    transformTokenToTableColumns(token) {
      return {
        id: token.path.filter(Boolean).join('-'),
        name: this.formatTokenName(this.selectedPlatform, token),
        type: token.$type,
        value: token.$value,
        valueLabel: this.getValueLabel(token),
        deprecated: token.deprecated ? 'deprecated' : '',
        description: token.$description,
      };
    },
    filterItems(items, filter) {
      if (!filter) return items;

      const fuse = new Fuse(items, {
        keys: Object.keys(items[0]),
        includeScore: true,
      });
      const results = fuse.search(filter);

      return results
        .sort((a, b) => {
          if (a.item.deprecated && !b.item.deprecated) return 1;
          if (!a.item.deprecated && b.item.deprecated) return -1;
          return a.score - b.score;
        })
        .map(({ item }) => item);
    },
    paginateItems(items, currentPage, perPage) {
      const start = (currentPage - 1) * perPage;
      return items.slice(start, start + perPage);
    },
    itemsProvider({ currentPage, perPage, filter }) {
      try {
        const items = this.transformTokensToTableRows(this.$options.tokens[this.selectedMode]);
        const filteredItems = this.filterItems(items, filter);
        this.totalFilteredItems = filteredItems.length;
        const paginatedFilteredItems = this.paginateItems(filteredItems, currentPage, perPage);
        return paginatedFilteredItems;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to provide items', e);
        return [];
      }
    },
    transformTokensToTableRows(tokens) {
      const tokensArray = [];

      Object.keys(tokens).forEach((key) => {
        const token = tokens[key];
        if (token.$value) {
          tokensArray.push(this.transformTokenToTableColumns(token));
        } else {
          tokensArray.push(...this.transformTokensToTableRows(token));
        }
      });

      tokensArray
        // Sort tokensArray by id
        .sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        })
        // Sort tokensArray so deprecated items are last
        .sort((a, b) => {
          if (a.deprecated && !b.deprecated) {
            return 1;
          }
          if (!a.deprecated && b.deprecated) {
            return -1;
          }
          return 0;
        });

      return tokensArray;
    },
    formatTokenName(format, token) {
      let figmaPrefix = '';
      const prefix = token.prefix === false ? '' : 'gl';
      switch (format) {
        case 'figma':
          if (token.filePath.match('contextual')) {
            figmaPrefix = '🔒/';
          }
          if (token.deprecated) {
            figmaPrefix = '⚠️ DEPRECATED/';
          }
          return `${figmaPrefix}${token.path.filter(Boolean).join('-')}`;
        case 'css':
          return `var(--${[prefix, ...token.path].filter(Boolean).join('-')})`;
        case 'scss':
          return `$${[prefix, ...token.path].filter(Boolean).join('-')}`;
        default:
          return token.path.filter(Boolean).join('.');
      }
    },
    getTokenName(token) {
      return `$${token.prefix === false ? '' : 'gl-'}${token.path.filter(Boolean).join('-')}`;
    },
    copyToClipboard(value) {
      navigator.clipboard.writeText(value);
    },
    resetCurrentPage() {
      this.currentPage = 1;
    },
    refresh() {
      this.$root.$emit('bv::refresh::table', 'tokens-table');
    },
  },
};
</script>

<template>
  <div>
    <p class="gl-text-sm gl-text-subtle">
      For full token details, see
      <gl-link
        href="https://gitlab.com/khulnasoft-org/khulnasoft-ui/-/tree/main/src/tokens/build/json"
        target="_blank"
        >https://gitlab.com/khulnasoft-org/khulnasoft-ui/-/tree/main/src/tokens/build/json</gl-link
      >
    </p>
    <div class="gl-mb-5 gl-flex gl-items-center gl-gap-3">
      <gl-search-box-by-type v-model="filter" debounce="250" class="gl-grow" />
      <gl-collapsible-listbox
        v-model="selectedPlatform"
        :selected="selectedPlatform"
        :items="platforms"
        @search="query = $event"
      />
      <gl-collapsible-listbox
        v-model="selectedMode"
        :selected="selectedMode"
        :items="modes"
        @search="query = $event"
      />
    </div>
    <gl-table
      id="tokens-table"
      :filter="filter"
      :items="itemsProvider"
      :fields="$options.fields"
      :tbody-tr-attr="(item) => ({ id: item.id })"
      :current-page="currentPage"
      :per-page="perPage"
      hover
      fixed
      stacked="sm"
    >
      <template #cell(description)="{ item: { name, deprecated, description } }">
        <code class="gl-text-base gl-text-strong">
          {{ name }}
          <gl-button
            v-gl-tooltip
            :title="`Copy ${selectedPlatform} value to clipboard`"
            icon="copy-to-clipboard"
            :aria-label="`Copy ${selectedPlatform} value to clipboard`"
            size="small"
            @click="copyToClipboard(name)"
          />
        </code>
        <gl-badge v-if="deprecated" variant="danger">Deprecated</gl-badge>
        <div v-if="description" class="gl-mt-3 gl-text-subtle">
          {{ description }}
        </div>
      </template>
      <template #cell(value)="{ item: { type, value, valueLabel } }">
        <div class="gl-flex gl-items-center gl-gap-3">
          <div
            v-if="isColor(type)"
            class="gl-h-5 gl-w-5 gl-rounded-base"
            :style="{ 'background-color': value }"
          ></div>
          <code class="gl-min-w-0 gl-text-base gl-text-strong">{{ valueLabel }}</code>
        </div>
      </template>
    </gl-table>

    <gl-pagination
      v-model="currentPage"
      align="center"
      :per-page="perPage"
      :total-items="totalFilteredItems"
    />
  </div>
</template>
