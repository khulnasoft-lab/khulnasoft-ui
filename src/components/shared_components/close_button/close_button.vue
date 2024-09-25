<script>
import { translate } from '../../../utils/i18n';
import GlButton from '../../base/button/button.vue';

const variantOptionClasses = {
  default: '',
  light: 'gl-close-button--light',
  dark: 'gl-close-button--dark',
};

export default {
  name: 'CloseButton',
  components: {
    GlButton,
  },
  props: {
    label: {
      type: String,
      required: false,
      default: () => translate('CloseButton.title', 'Close'),
    },
    variant: {
      type: String,
      required: false,
      default: 'default',
      validator: (value) => Object.keys(variantOptionClasses).includes(value),
    },
  },
  computed: {
    variantClass() {
      return variantOptionClasses[this.variant];
    },
  },
};
</script>

<template>
  <gl-button
    category="tertiary"
    size="small"
    icon="close"
    :class="variantClass"
    :aria-label="label"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>
