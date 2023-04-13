<!-- eslint-disable vue/multi-word-component-names -->
<script>
import iconsPath from '@gitlab/svgs/dist/icons.svg';
import { iconSizeOptions } from '../../../utils/constants';

let iconValidator = () => true;

/*
 During development/tests we want to validate that we are just using icons that are actually defined
*/
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  const data = require('@gitlab/svgs/dist/icons.json');
  const { icons } = data;
  iconValidator = (value) => {
    if (icons.includes(value)) {
      return true;
    }
    // eslint-disable-next-line no-console
    console.warn(`Icon '${value}' is not a known icon of @gitlab/svgs`);
    return false;
  };
}

/** This is a re-usable vue component for rendering a svg sprite icon
 *  @example
 *  <icon
 *    name="retry"
 *    :size="32"
 *    class="top"
 *  />
 */
export default {
  name: 'GlIcon',
  props: {
    /**
     * Accessible icon name used by screen readers and other assistive technologies.
     * Provide when icon is not merely decorative
     */
    ariaLabel: {
      type: String,
      required: false,
      default: undefined,
    },
    /**
     * One of the icons from https://gitlab-org.gitlab.io/gitlab-svgs/ project
     */
    name: {
      type: String,
      required: true,
      validator: iconValidator,
    },
    /**
     * Icon size
     */
    size: {
      type: Number,
      required: false,
      default: 16,
      validator: (value) => iconSizeOptions.includes(value),
    },
  },
  computed: {
    spriteHref() {
      return `${iconsPath}#${this.name}`;
    },
    iconSizeClass() {
      return this.size ? `s${this.size}` : '';
    },
  },
};
</script>

<template>
  <svg
    :key="spriteHref"
    :class="['gl-icon', iconSizeClass]"
    :data-testid="`${name}-icon`"
    role="img"
    :aria-hidden="!ariaLabel"
    :aria-label="ariaLabel"
    v-on="$listeners"
  >
    <use :href="spriteHref" />
  </svg>
</template>
