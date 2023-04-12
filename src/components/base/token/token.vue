<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { tokenVariants } from '../../../utils/constants';
import CloseButton from '../../shared_components/close_button/close_button.vue';

export default {
  name: 'GlToken',
  components: {
    CloseButton,
  },
  props: {
    viewOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Token visual variants: default, search-type, and search-value.
     */
    variant: {
      type: String,
      required: false,
      default: 'default',
      validator: (variant) => tokenVariants.includes(variant),
    },
  },
  computed: {
    variantClass() {
      return `gl-token-${this.variant}-variant`;
    },
    viewOnlyClass() {
      return {
        'gl-token-view-only': this.viewOnly,
      };
    },
  },
  methods: {
    close($event) {
      /**
       * Emitted when x is clicked
       *
       * @event close
       */
      this.$emit('close', $event);
    },
  },
};
</script>

<template>
  <span :class="['gl-token', variantClass, viewOnlyClass]" v-on="$listeners">
    <span class="gl-token-content">
      <slot></slot>
      <close-button
        v-if="!viewOnly"
        class="gl-token-close gl-close-btn-color-inherit"
        @click="close"
      />
    </span>
  </span>
</template>
