<script>
import { BNavItemDropdown } from 'bootstrap-vue';
import GlIcon from '../icon/icon.vue';

export default {
  name: 'GlNavItemDropdown',
  components: {
    BNavItemDropdown,
    GlIcon,
  },
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      required: false,
      default: '',
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<template>
  <b-nav-item-dropdown class="gl-dropdown" v-bind="$attrs" v-on="$listeners">
    <template #default>
      <slot></slot>
    </template>
    <template #button-content>
      <slot name="button-content">
        <gl-icon v-if="icon" class="dropdown-icon" :name="icon" />
        {{ text }}
        <gl-icon class="dropdown-chevron" name="chevron-down" />
      </slot>
    </template>
  </b-nav-item-dropdown>
</template>
