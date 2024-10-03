<script>
import { translate } from '../../../utils/i18n';
import GlButton from '../../base/button/button.vue';
import { closeButtonVariantOptions } from '../../../utils/constants';

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
      default: closeButtonVariantOptions.default,
      validator: (value) => Object.keys(closeButtonVariantOptions).includes(value),
    },
  },
};
</script>

<template>
  <gl-button
    category="tertiary"
    size="small"
    icon="close"
    :class="['gl-close-button', `gl-close-button-${variant}`]"
    :aria-label="label"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>
