<!-- eslint-disable vue/multi-word-component-names -->
<script>
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import toString from 'lodash/toString';
import isBoolean from 'lodash/isBoolean';
import concat from 'lodash/concat';
import { SafeLinkDirective, isExternalURL } from '../../../directives/safe_link/safe_link';
import { stopEvent } from '../../../utils/utils';
import { isEvent } from '../../../vendor/bootstrap-vue/src/utils/inspect';
import { stringifyQueryObj } from '../../../vendor/bootstrap-vue/src/utils/router';
import { safeVueInstance } from '../../../vendor/bootstrap-vue/src/utils/safe-vue-instance';
import { attemptFocus, attemptBlur } from '../../../vendor/bootstrap-vue/src/utils/dom';
import {
  linkVariantOptions,
  linkVariantInline,
  linkVariantUnstyled,
  isVue3,
} from '../../../utils/constants';

const ANCHOR_TAG = 'a';
const NUXT_LINK_TAG = 'nuxt-link';
const VUE_ROUTER_LINK_TAG = 'router-link';

export default {
  name: 'GlLink',
  directives: {
    SafeLink: SafeLinkDirective,
  },
  props: {
    /**
     * Denotes the target URL of the link for standard links.
     */
    href: {
      type: String,
      required: false,
      default: undefined,
    },
    /**
     * When set to `true`, disables the component's functionality and places it in a disabled state.
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
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
     * When set to `true`, places the component in the active state with active styling
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
    /**
     * If inline variant, controls ↗ character visibility
     */
    showExternalIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Link variant
     */
    variant: {
      type: String,
      required: false,
      default: null,
      validator: (value) => value && Object.hasOwn(linkVariantOptions, value),
    },
  },
  computed: {
    safeLinkConfig() {
      return {
        skipSanitization: this.isUnsafeLink,
      };
    },
    tag() {
      const hasRouter = Boolean(safeVueInstance(this).$router);
      const hasNuxt = Boolean(safeVueInstance(this).$nuxt);

      if (!hasRouter || this.disabled || !this.to) {
        return ANCHOR_TAG;
      }

      return hasNuxt ? NUXT_LINK_TAG : VUE_ROUTER_LINK_TAG;
    },
    isRouterLink() {
      return this.tag !== ANCHOR_TAG;
    },
    isVue3RouterLink() {
      return this.tag === VUE_ROUTER_LINK_TAG && isVue3;
    },
    isInlineAndHasExternalIcon() {
      return (
        this.showExternalIcon &&
        this.variant === linkVariantInline &&
        this.href &&
        isExternalURL(this.target, this.href)
      );
    },
    computedHref() {
      const fallback = '#';
      const toFallback = '/';
      const { to } = this;

      // Return `href` when explicitly provided
      if (this.href) {
        return this.href;
      }

      if (isString(to)) {
        return to || toFallback;
      }

      // Fallback to `to.path' + `to.query` + `to.hash` prop (if `to` is an object)
      if (isObject(to) && (to.path || to.query || to.hash)) {
        const path = toString(to.path);
        const query = stringifyQueryObj(to.query);
        let hash = toString(to.hash);
        hash = !hash || hash.charAt(0) === '#' ? hash : `#${hash}`;
        return `${path}${query}${hash}` || fallback;
      }

      return fallback;
    },
    computedProps() {
      if (this.isRouterLink) {
        return {
          to: this.to,
          activeClass: this.activeClass,
          exactActiveClass: this.exactActiveClass,
          replace: this.replace,
          ...(isBoolean(this.prefetch) ? { prefetch: this.prefetch } : {}),
        };
      }

      return {
        disabled: this.disabled,
        ...(this.disabled ? { 'aria-disabled': 'true', tabindex: '-1' } : {}),
        rel: this.rel,
        target: this.target,
        href: this.computedHref,
      };
    },
    computedListeners() {
      const { click, ...listenersWithoutClick } = this.$listeners;

      return listenersWithoutClick;
    },
    computedClass() {
      if (this.variant === linkVariantUnstyled) {
        return [];
      }

      return [
        'gl-link',
        linkVariantOptions[this.variant],
        {
          disabled: this.disabled,
          active: this.active,
          'gl-link-inline-external': this.isInlineAndHasExternalIcon,
        },
      ];
    },
  },
  methods: {
    onClick(event, navigate) {
      const eventIsEvent = isEvent(event);
      const suppliedHandler = this.$listeners.click;

      if (eventIsEvent && this.disabled) {
        // Stop event from bubbling up
        // Kill the event loop attached to this specific `EventTarget`
        // Needed to prevent `vue-router` from navigating
        stopEvent(event, { immediatePropagation: true });
      } else {
        // Router links do not emit instance `click` events, so we
        // add in an `$emit('click', event)` on its Vue instance
        //
        // seems not to be required for Vue3 compat build
        if (this.isRouterLink) {
          // eslint-disable-next-line no-underscore-dangle
          event.currentTarget.__vue__?.$emit('click', event);
        }

        // Call the suppliedHandler(s), if any provided
        concat([], suppliedHandler)
          .filter((h) => isFunction(h))
          .forEach((handler) => {
            // eslint-disable-next-line prefer-rest-params
            handler(...arguments);
          });

        // this navigate function comes from Vue 3 router
        // See https://router.vuejs.org/guide/advanced/extending-router-link.html#Extending-RouterLink
        if (isFunction(navigate)) {
          navigate(event);
        }

        // TODO: Remove deprecated 'clicked::link' event
        this.$root.$emit('clicked::link', event);
      }
      // Stop scroll-to-top behavior or navigation on
      // regular links when href is just '#'
      if (eventIsEvent && !this.isRouterLink && this.computedHref === '#') {
        stopEvent(event, { stopPropagation: false });
      }
    },
    focus() {
      attemptFocus(this.$el);
    },
    blur() {
      attemptBlur(this.$el);
    },
  },
};
</script>

<template>
  <component
    :is="tag"
    v-if="isVue3RouterLink"
    #default="{ href: routerLinkHref, isActive, isExactActive, navigate }"
    v-bind="computedProps"
    custom
  >
    <a
      v-safe-link:[safeLinkConfig]
      :class="[computedClass, { [activeClass]: isActive, [exactActiveClass]: isExactActive }]"
      :href="routerLinkHref"
      v-on="computedListeners"
      @click="onClick($event, navigate)"
    >
      <slot></slot>
    </a>
  </component>
  <component
    :is="tag"
    v-else-if="isRouterLink"
    v-safe-link:[safeLinkConfig]
    v-bind="computedProps"
    :class="computedClass"
    v-on="computedListeners"
    @click.native="onClick"
  >
    <slot></slot>
  </component>
  <component
    :is="tag"
    v-else
    v-safe-link:[safeLinkConfig]
    v-bind="computedProps"
    :class="computedClass"
    v-on="computedListeners"
    @click="onClick"
  >
    <slot></slot>
  </component>
</template>
