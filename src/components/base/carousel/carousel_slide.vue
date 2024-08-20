<script>
import { BCarouselSlide } from '../../../vendor/bootstrap-vue/src/components/carousel/carousel-slide';

export default {
  name: 'GlCarouselSlide',
  components: {
    BCarouselSlide,
  },
};
</script>
<template>
  <b-carousel-slide v-bind="$attrs" v-on="$listeners">
    <!-- eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots -->
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot"></slot>
    </template>
  </b-carousel-slide>
</template>
