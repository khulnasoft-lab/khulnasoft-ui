<script>
import { BLink } from '../../../vendor/bootstrap-vue/src/components/link/link';
import { breadCrumbSizeOptions } from '../../../utils/constants';

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
    size: {
      type: String,
      required: false,
      default: breadCrumbSizeOptions.sm,
      validator: (value) => Object.keys(breadCrumbSizeOptions).includes(value),
    },
  },
};
</script>

<template>
  <li :class="`gl-breadcrumb-item gl-breadcrumb-item-${size}`">
    <b-link :href="href" :to="to" :aria-current="ariaCurrent">
      <slot>{{ text }}</slot>
    </b-link>
  </li>
</template>
