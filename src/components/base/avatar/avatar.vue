<!-- eslint-disable vue/multi-word-component-names -->
<script>
import isNumber from 'lodash/isNumber';
import { avatarShapeOptions, avatarSizeOptions } from '../../../utils/constants';
import { getAvatarChar } from '../../../utils/string_utils';

const IDENTICON_BG_COUNT = 7;

export default {
  name: 'GlAvatar',
  props: {
    entityId: {
      type: Number,
      required: false,
      default: 0,
    },
    entityName: {
      type: String,
      required: false,
      default: '',
    },
    src: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Show fallback identicon when image fails to load
     */
    fallbackOnError: {
      type: Boolean,
      required: false,
      default: false,
    },
    alt: {
      type: String,
      required: false,
      default: 'avatar',
    },
    size: {
      type: [Number, Object],
      required: false,
      default: avatarSizeOptions[1],
      validator: (value) => {
        const sizes = isNumber(value) ? [value] : Object.values(value);

        const areValidSizes = sizes.every((size) => {
          const isValidSize = avatarSizeOptions.includes(size);

          if (!isValidSize) {
            /* eslint-disable-next-line no-console */
            console.error(`Avatar size should be one of [${avatarSizeOptions}], received: ${size}`);
          }

          return isValidSize;
        });

        return areValidSizes;
      },
    },
    shape: {
      type: String,
      required: false,
      default: avatarShapeOptions.circle,
    },
  },
  data() {
    return {
      imageLoadError: false,
    };
  },
  computed: {
    sizeClasses() {
      if (isNumber(this.size)) {
        return `gl-avatar-s${this.size}`;
      }

      const { default: defaultSize, ...nonDefaultSizes } = this.size;

      return [
        `gl-avatar-s${defaultSize || avatarSizeOptions[1]}`,
        ...Object.entries(nonDefaultSizes).map(
          ([breakpoint, size]) => `gl-${breakpoint}-avatar-s${size}`
        ),
      ];
    },
    isCircle() {
      return this.shape === avatarShapeOptions.circle;
    },
    identiconBackgroundClass() {
      /*
       * Gets a number between 1-7 depending on the 'entityId'.
       * Gets the remainder after dividing the 'entityId' by the number of available backgrounds.
       */
      const type = (this.entityId % IDENTICON_BG_COUNT) + 1;
      return `gl-avatar-identicon-bg${type}`;
    },
    identiconText() {
      return getAvatarChar(this.entityName);
    },
    showImage() {
      // Don't show when image is not present
      if (!this.src) {
        return false;
      }
      // Don't show when fallbackOnError is true and there was failure to load image
      if (this.src && this.fallbackOnError && this.imageLoadError) {
        return false;
      }
      return true;
    },
  },
  watch: {
    src(newSrc, oldSrc) {
      if (newSrc !== oldSrc) this.imageLoadError = false;
    },
  },
  methods: {
    handleLoadError(event) {
      this.imageLoadError = true;
      this.$emit('load-error', event);
    },
  },
};
</script>
<template>
  <img
    v-if="showImage"
    :src="src"
    :alt="alt"
    :class="['gl-avatar', { 'gl-avatar-circle': isCircle }, sizeClasses]"
    @error="handleLoadError"
    v-on="$listeners"
  />
  <div
    v-else
    :class="[
      'gl-avatar gl-avatar-identicon',
      { 'gl-avatar-circle': isCircle },
      sizeClasses,
      identiconBackgroundClass,
    ]"
    v-on="$listeners"
  >
    {{ identiconText }}
  </div>
</template>
