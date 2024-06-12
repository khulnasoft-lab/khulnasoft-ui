<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { BCarousel } from '../../../vendor/bootstrap-vue/src/components/carousel/carousel';

export default {
  name: 'GlCarousel',
  components: {
    BCarousel,
  },
};
</script>
<template>
  <b-carousel v-bind="$attrs" v-on="$listeners">
    <!-- eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots -->
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot"></slot>
    </template>
  </b-carousel>
</template>
