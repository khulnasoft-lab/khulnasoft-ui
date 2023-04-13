<script>
import { BLink } from 'bootstrap-vue';

export default {
  name: 'GlBreadcrumbItem',
  components: {
    BLink,
  },
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      required: false,
      default: null,
    },
    to: {
      type: [String, Object],
      required: false,
      default: null,
    },
    href: {
      type: String,
      required: false,
      default: null,
    },
    ariaCurrent: {
      type: [String, Boolean],
      required: false,
      default: false,
      validator(value) {
        return [false, 'page'].indexOf(value) !== -1;
      },
    },
  },
};
</script>

<template>
  <li class="gl-breadcrumb-item">
    <b-link :href="href" :to="to" :aria-current="ariaCurrent">
      <slot>{{ text }}</slot>
    </b-link>
  </li>
</template>
