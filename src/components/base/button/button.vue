<!-- eslint-disable vue/multi-word-component-names -->
<script>
import GlLink from '../link/link.vue';
import {
  buttonCategoryOptions,
  buttonVariantOptions,
  buttonSizeOptions,
  linkVariantUnstyled,
} from '../../../utils/constants';
import { logWarning, stopEvent } from '../../../utils/utils';
import { isSlotEmpty } from '../../../utils/is_slot_empty';
import { SafeLinkMixin } from '../../mixins/safe_link_mixin';
import { isEvent } from '../../../vendor/bootstrap-vue/src/utils/inspect';
import GlIcon from '../icon/icon.vue';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';
import { ENTER, SPACE } from '../new_dropdowns/constants';

export default {
  name: 'GlButton',
  components: {
    GlIcon,
    GlLoadingIcon,
  },
  mixins: [SafeLinkMixin],
  props: {
    /**
     * Set the category of the button.
     */
    category: {
      type: String,
      required: false,
      default: buttonCategoryOptions.primary,
      validator: (value) => Object.keys(buttonCategoryOptions).includes(value),
    },
    /**
     * Set the variant of the button.
     */
    variant: {
      type: String,
      required: false,
      default: buttonVariantOptions.default,
      validator: (value) => Object.keys(buttonVariantOptions).includes(value),
    },
    /**
     * Specify the size of the button. Options are `small` and `medium`.
     */
    size: {
      type: String,
      required: false,
      default: 'medium',
      validator: (value) => Object.keys(buttonSizeOptions).includes(value),
    },
    /**
     * Style the button as selected.
     */
    selected: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Specify an icon to render in the button.
     */
    icon: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Render a non-interactive label button, a `span` styled as a button.
     */
    label: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Set the loading state of the button.
     */
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * CSS classes to add to the button text.
     */
    buttonTextClasses: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Renders a 100% width button (expands to the width of its parent container).
     */
    block: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Specify the HTML tag to render instead of the default tag.
     */
    tag: {
      type: String,
      required: false,
      default: 'button',
    },
    /**
     * The value to set the button's `type` attribute to. Can be one of `button`, `submit`, or `reset`.
     */
    type: {
      type: String,
      required: false,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value),
    },
    /**
     * Disables the component's functionality and places it in a disabled state.
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Denotes the target URL of the link for standard links.
     */
    href: {
      type: String,
      required: false,
      default: undefined,
    },
    /**
     * Skips sanitization of href if true. This should be used sparingly.
     * Consult security team before setting to true.
     */
    isUnsafeLink: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Sets the 'rel' attribute on the rendered link.
     */
    rel: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Sets the 'target' attribute on the rendered link.
     */
    target: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Places the component in the active state with active styling
     */
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * <router-link> prop: Denotes the target route of the link.
     * When clicked, the value of the to prop will be passed to `router.push()` internally,
     * so the value can be either a string or a Location descriptor object.
     */
    to: {
      type: [Object, String],
      required: false,
      default: undefined,
    },
    /**
     * <router-link> prop: Configure the active CSS class applied when the link is active.
     */
    activeClass: {
      type: String,
      required: false,
      default: undefined,
    },
    /**
     * <router-link> prop: Configure the active CSS class applied when the link is active with exact match.
     */
    exactActiveClass: {
      type: String,
      required: false,
      default: undefined,
    },
    /**
     * <router-link> prop: Setting the replace prop will call `router.replace()` instead of `router.push()`
     * when clicked, so the navigation will not leave a history record.
     */
    replace: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * <nuxt-link> prop: To improve the responsiveness of your Nuxt.js applications, when the link will be displayed within the viewport,
     * Nuxt.js will automatically prefetch the code splitted page. Setting `prefetch` to `true` or `false` will overwrite the default value of `router.prefetchLinks`
     */
    prefetch: {
      type: Boolean,
      required: false,
      // Must be `null` to fall back to the value defined in the
      // `nuxt.config.js` configuration file for `router.prefetchLinks`
      // We convert `null` to `undefined`, so that Nuxt.js will use the
      // compiled default
      // Vue treats `undefined` as default of `false` for Boolean props,
      // so we must set it as `null` here to be a true tri-state prop
      default: null,
    },
  },
  computed: {
    hasIcon() {
      return this.icon !== '';
    },
    hasIconOnly() {
      return isSlotEmpty(this, 'default') && this.hasIcon;
    },
    isButtonDisabled() {
      return this.disabled || this.loading;
    },
    buttonClasses() {
      const classes = ['btn', 'gl-button', `btn-${this.variant}`, `btn-${this.buttonSize}`];

      if (this.category !== buttonCategoryOptions.primary) {
        classes.push(`btn-${this.variant}-${this.category}`);
      }

      classes.push({
        'btn-icon': this.hasIconOnly,
        'button-ellipsis-horizontal': this.hasIconOnly && this.icon === 'ellipsis_h',
        selected: this.selected,
        'btn-block': this.displayBlock,
        disabled: this.disabled,
      });

      if (this.label) {
        classes.push('btn', 'btn-label');
      }

      return classes;
    },
    buttonSize() {
      return buttonSizeOptions[this.size];
    },
    displayBlock() {
      return !this.label && this.block;
    },
    isLink() {
      return this.href || this.to;
    },
    isHashLink() {
      return this.isLink && this.href === '#';
    },
    isButton() {
      return this.componentIs === 'button';
    },
    isNonStandardTag() {
      if (this.label) {
        return false;
      }

      return !this.isLink && !this.isButton;
    },
    tabindex() {
      // When disabled remove links and non-standard tags from tab order
      if (this.disabled) {
        return this.isLink || this.isNonStandardTag ? '-1' : this.$attrs.tabindex;
      }

      // Add hash links and non-standard tags to tab order
      return this.isNonStandardTag || this.isHashLink ? '0' : this.$attrs.tabindex;
    },
    computedPropsAndAttributes() {
      const base = {
        // Type only used for "real" buttons
        type: this.isButton ? this.type : null,
        // Disabled only set on "real" buttons
        disabled: this.isButton ? this.isButtonDisabled : null,
        // We add a role of button when the tag is not a link or button or when link has `href` of `#`
        role: this.isNonStandardTag || this.isHashLink ? 'button' : this.$attrs?.role,
        // We set the `aria-disabled` state for non-standard tags
        ...(this.isNonStandardTag ? { 'aria-disabled': String(this.disabled) } : {}),
        tabindex: this.tabindex,
      };

      if (this.isLink) {
        return {
          ...this.$attrs,
          ...base,
          variant: linkVariantUnstyled,
          disabled: this.disabled,
          href: this.href,
          isUnsafeLink: this.isUnsafeLink,
          rel: this.rel,
          target: this.target,
          active: this.active,
          to: this.to,
          activeClass: this.activeClass,
          exactActiveClass: this.exactActiveClass,
          replace: this.replace,
          prefetch: this.prefetch,
        };
      }

      return { ...this.$attrs, ...base };
    },
    computedListeners() {
      return {
        click: this.onClick,
        keydown: this.onKeydown,
        ...this.$listeners,
      };
    },
    componentIs() {
      if (this.label) {
        return 'span';
      }

      if (this.isLink) {
        return GlLink;
      }

      return this.tag;
    },
  },
  mounted() {
    // eslint-disable-next-line @gitlab/vue-prefer-dollar-scopedslots
    if (!this.$slots.default && !this.$attrs['aria-label'] && !this.$props.label) {
      logWarning(
        '[gl-button]: Accessible name missing. Please add inner text or aria-label.',
        this.$el
      );
    }
  },
  methods: {
    onKeydown(event) {
      // Skip if disabled
      // Add SPACE keydown handler for link has `href` of `#`
      // Add ENTER handler for non-standard tags
      if (!this.disabled && (this.isNonStandardTag || this.isHashLink)) {
        const { code } = event;

        if (code === SPACE || (code === ENTER && this.isNonStandardTag)) {
          const target = event.currentTarget || event.target;
          stopEvent(event, { propagation: false });
          target.click();
        }
      }
    },
    onClick(event) {
      if (this.disabled && isEvent(event)) {
        stopEvent(event);
      }
    },
  },
};
</script>
<template>
  <component
    :is="componentIs"
    v-bind="computedPropsAndAttributes"
    v-safe-link:[safeLinkConfig]
    :class="buttonClasses"
    v-on="computedListeners"
  >
    <gl-loading-icon v-if="loading" inline class="gl-button-icon gl-button-loading-indicator" />
    <gl-icon v-if="hasIcon && !(hasIconOnly && loading)" class="gl-button-icon" :name="icon" />
    <slot name="emoji"></slot>
    <span v-if="!hasIconOnly" :class="buttonTextClasses" class="gl-button-text"><slot></slot></span>
  </component>
</template>
