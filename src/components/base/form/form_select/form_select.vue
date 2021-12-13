<script>
import { BFormSelect } from 'bootstrap-vue';

export default {
  components: {
    BFormSelect,
  },
  inheritAttrs: false,
};

/**
 * @event change Emitted with the select value changes via user interaction.
 */

/**
 * @event input Emitted with the select value changes.
 */
</script>
<template>
  <b-form-select class="gl-form-select" v-bind="$attrs" v-on="$listeners">
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <!-- @slot Slot to place option tags above options provided via options prop -->
      <slot :name="slot"></slot>
    </template>
  </b-form-select>
</template>
