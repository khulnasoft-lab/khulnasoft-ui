<script>
import GlToken from '../token/token.vue';
import GlButton from '../button/button.vue';
import { tokensValidator } from './helpers';

export default {
  name: 'GlTokenContainer',
  components: { GlToken, GlButton },
  props: {
    tokens: {
      type: Array,
      // All tokens need to have an `id` key
      validator: tokensValidator,
      required: true,
    },
    state: {
      type: Boolean,
      required: false,
      default: null,
    },
    registerFocusOnToken: {
      type: Function,
      required: true,
    },
    viewOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    showClearAllButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      bindFocusEvent: true,
      focusedTokenIndex: null,
    };
  },
  computed: {
    focusedToken() {
      return this.tokens[this.focusedTokenIndex] || null;
    },
  },
  watch: {
    focusedToken(newValue) {
      if (newValue === null) {
        return;
      }

      const tokenRef = this.$refs.tokens?.find(
        (ref) => ref.dataset.tokenId === newValue.id.toString()
      );

      if (tokenRef) {
        // Prevent `handleTokenFocus` from being called when we manually focus on a token
        this.bindFocusEvent = false;
        tokenRef.focus();
        this.bindFocusEvent = true;
      }
    },
  },
  created() {
    this.registerFocusOnToken(this.focusOnToken);
  },
  methods: {
    handleClose(token) {
      this.$emit('token-remove', token);
      this.focusedTokenIndex = null;
    },
    handleLeftArrow() {
      if (this.focusedTokenIndex === 0) {
        this.focusLastToken();
      } else {
        this.focusPrevToken();
      }
    },
    handleRightArrow() {
      if (this.focusedTokenIndex === this.tokens.length - 1) {
        this.focusFirstToken();
      } else {
        this.focusNextToken();
      }
    },
    handleHome() {
      this.focusFirstToken();
    },
    handleEnd() {
      this.focusLastToken();
    },
    handleDelete() {
      this.$emit('token-remove', this.focusedToken);

      if (this.focusedTokenIndex > 0) {
        this.focusPrevToken();
      }
    },
    handleEscape() {
      this.focusedTokenIndex = null;
      this.$emit('cancel-focus');
    },
    handleTab() {
      this.$emit('cancel-focus');
    },
    // Only called when a token is focused by a click/tap
    handleTokenFocus(index) {
      this.focusedTokenIndex = index;
    },
    focusLastToken() {
      this.focusedTokenIndex = this.tokens.length - 1;
    },
    focusFirstToken() {
      this.focusedTokenIndex = 0;
    },
    focusNextToken() {
      this.focusedTokenIndex += 1;
    },
    focusPrevToken() {
      this.focusedTokenIndex -= 1;
    },
    focusOnToken(tokenIndex = null) {
      this.focusedTokenIndex = tokenIndex;
    },
  },
};
</script>

<template>
  <div class="gl-display-flex gl-flex-nowrap gl-align-items-flex-start gl-w-full">
    <div
      ref="tokenContainer"
      class="gl-display-flex gl-flex-wrap gl-align-items-center gl-my-n1 gl-mx-n1 gl-w-full"
      role="listbox"
      aria-multiselectable="false"
      aria-orientation="horizontal"
      :aria-invalid="state === false && 'true'"
      @keydown.left="handleLeftArrow"
      @keydown.right="handleRightArrow"
      @keydown.home="handleHome"
      @keydown.end="handleEnd"
      @keydown.delete="handleDelete"
      @keydown.esc="handleEscape"
      @keydown.tab.exact.prevent="handleTab"
    >
      <div
        v-for="(token, index) in tokens"
        ref="tokens"
        :key="token.id"
        :data-token-id="token.id"
        class="gl-token-selector-token-container gl-px-1 gl-py-2 gl-outline-none"
        role="option"
        tabindex="-1"
        @focus="bindFocusEvent ? handleTokenFocus(index) : null"
      >
        <gl-token
          class="gl-cursor-default"
          :class="token.class"
          :style="token.style"
          :view-only="viewOnly"
          @close="handleClose(token)"
        >
          <slot name="token-content" :token="token">
            <span>
              {{ token.name }}
            </span>
          </slot>
        </gl-token>
      </div>
      <slot name="text-input"></slot>
    </div>
    <div v-if="showClearAllButton" class="gl-ml-3 gl-p-1">
      <gl-button
        size="small"
        aria-label="Clear all"
        icon="clear"
        category="tertiary"
        data-testid="clear-all-button"
        @click.stop="$emit('clear-all')"
      />
    </div>
  </div>
</template>
