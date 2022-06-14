<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BTab } from 'bootstrap-vue';
import { isArray, isPlainObject } from 'lodash';

import { DEFAULT_TAB_TITLE_LINK_CLASS } from '../constants';

export default {
  components: {
    BTab,
  },
  inheritAttrs: false,
  props: {
    titleLinkClass: {
      type: [String, Array, Object],
      required: false,
      default: '',
    },
    /**
     * Query string parameter value to use when `gl-tabs` `sync-active-tab-with-query-params` prop is set to `true`.
     */
    queryParamValue: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Provide an `href` for the tab, for example to associate the tab with the tab panel's ID
     */
    href: {
      type: String,
      required: false,
      default: '#',
    },
  },
  computed: {
    linkClass() {
      const { titleLinkClass } = this;

      if (isArray(titleLinkClass)) {
        return [...titleLinkClass, DEFAULT_TAB_TITLE_LINK_CLASS];
      }
      if (isPlainObject(titleLinkClass)) {
        return { ...titleLinkClass, [DEFAULT_TAB_TITLE_LINK_CLASS]: true };
      }
      return `${titleLinkClass} ${DEFAULT_TAB_TITLE_LINK_CLASS}`.trim();
    },
  },
};
</script>

<template>
  <b-tab
    :title-link-class="linkClass"
    :query-param-value="queryParamValue"
    v-bind="$attrs"
    :title-link-attributes="{ href }"
    v-on="$listeners"
  >
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot"></slot>
    </template>
  </b-tab>
</template>
