<script>
import GlLink from '../link/link.vue';
import { breadCrumbSizeOptions, linkVariantUnstyled } from '../../../utils/constants';

export default {
  name: 'GlBreadcrumbItem',
  components: {
    GlLink,
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
  linkVariantUnstyled,
};
</script>

<template>
  <li :class="`gl-breadcrumb-item gl-breadcrumb-item-${size}`">
    <gl-link
      :href="href"
      :to="to"
      :aria-current="ariaCurrent"
      :variant="$options.linkVariantUnstyled"
    >
      <slot>{{ text }}</slot>
    </gl-link>
  </li>
</template>
