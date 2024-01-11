<script>
import uniqueId from 'lodash/uniqueId';
import { tokensValidator } from './helpers';
import GlTokenContainer from './token_container.vue';
import GlTokenSelectorDropdown from './token_selector_dropdown.vue';

export default {
  name: 'GlTokenSelector',
  componentId: uniqueId('token-selector'),
  components: {
    GlTokenContainer,
    GlTokenSelectorDropdown,
  },
  model: {
    prop: 'selectedTokens',
    event: 'input',
  },
  props: {
    /**
     * Items to display in dropdown
     */
    dropdownItems: {
      type: Array,
      // All items need to have an `id` key
      validator: tokensValidator,
      required: false,
      default: () => [],
    },
    /**
     * Should users be allowed to add tokens that are not in `dropdown-items`
     */
    allowUserDefinedTokens: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Dropdown items are loading, can be used when requesting new dropdown items
     */
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Hide the dropdown if `dropdown-items` is empty. Will show `no-results-content` slot if this is `false`
     */
    hideDropdownWithNoItems: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * CSS classes to add to the main token selector container (`.gl-token-selector`)
     */
    containerClass: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * CSS classes to add to dropdown menu `ul` element
     */
    menuClass: {
      type: [String, Array, Object],
      required: false,
      default: '',
    },
    /**
     * The autocomplete attribute value for the underlying `input` element
     */
    autocomplete: {
      type: String,
      required: false,
      default: 'off',
    },
    /**
     * The `aria-labelledby` attribute value for the underlying `input` element
     */
    ariaLabelledby: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * The `placeholder` attribute value for the underlying `input` element
     */
    placeholder: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * HTML attributes to add to the text input. Helpful for adding `data-testid` attributes
     */
    textInputAttrs: {
      type: Object,
      required: false,
      default: null,
    },
    /**
     * Controls the validation state appearance of the component. `true` for valid, `false` for invalid, or `null` for no validation state
     */
    state: {
      type: Boolean,
      required: false,
      default: null,
    },
    /**
     * Tokens that are selected. This prop will automatically be added when using `v-model`
     */
    selectedTokens: {
      type: Array,
      // All tokens need to have an `id` key
      validator: tokensValidator,
      required: true,
    },
    /**
     * Controls the `view-only` mode for the tokens
     */
    viewOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Allows user to bulk delete tokens when enabled
     */
    allowClearAll: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      inputText: '',
      inputFocused: false,
      dropdownIsOpen: false,
      focusedDropdownItem: null,
      triggerTokenFocusNextBackspace: true,
      rootElClasses: '',
      dropdownEventHandlers: {
        handleUpArrow: () => {},
        handleDownArrow: () => {},
        handleHomeKey: () => {},
        handleEndKey: () => {},
      },
      resetFocusedDropdownItem: () => {},
      focusOnToken: () => {},
    };
  },
  computed: {
    filteredDropdownItems() {
      return this.dropdownItems.filter(
        (dropdownItem) =>
          this.selectedTokens.findIndex((token) => token.id === dropdownItem.id) === -1
      );
    },
    dropdownHasNoItems() {
      return !this.filteredDropdownItems.length;
    },
    userDefinedTokenCanBeAdded() {
      return this.allowUserDefinedTokens && this.dropdownHasNoItems && this.inputText !== '';
    },
    hideDropdown() {
      if (this.userDefinedTokenCanBeAdded) {
        return false;
      }

      if (this.hideDropdownWithNoItems && this.dropdownHasNoItems) {
        return true;
      }

      return false;
    },
    stateClass() {
      if (this.state === null) {
        return 'gl-inset-border-1-gray-400!';
      }

      return this.state
        ? 'is-valid gl-inset-border-1-gray-400!'
        : 'is-invalid gl-inset-border-1-red-500!';
    },
    hasSelectedTokens() {
      return this.selectedTokens.length > 0;
    },
    showEmptyPlaceholder() {
      return !this.hasSelectedTokens && !this.inputFocused;
    },
    showClearAllButton() {
      return this.hasSelectedTokens && this.allowClearAll;
    },
  },
  watch: {
    inputText(newValue, oldValue) {
      if (newValue !== oldValue) {
        /**
         * Fired when user types in the token selector
         *
         * @property {string} inputText
         */
        this.$emit('text-input', newValue);

        this.resetFocusedDropdownItem();

        if (newValue !== '') {
          this.triggerTokenFocusNextBackspace = false;
        } else {
          this.triggerTokenFocusNextBackspace = true;
        }

        // Wait a tick so `text-input` event can be used to validate
        // the value and change the `allowUserDefinedTokens` and/or
        // `hideDropdownWithNoItems` props
        this.$nextTick(() => {
          if (this.hideDropdown) {
            this.closeDropdown();
          } else if (newValue !== '') {
            this.openDropdown();
          }
        });
      }
    },
  },
  methods: {
    handleFocus(event) {
      /**
       * Fired when the token selector is focused
       *
       * @property {FocusEvent} event
       */
      this.$emit('focus', event);

      this.openDropdown();
      this.inputFocused = true;
      this.focusOnToken();

      if (this.inputText === '') {
        this.triggerTokenFocusNextBackspace = true;
      }
    },
    handleBlur(event) {
      /**
       * Fired when the token selector is blurred
       *
       * @property {FocusEvent} event
       */
      this.$emit('blur', event);

      this.inputFocused = false;

      // `event.relatedTarget` returns `null` on Safari because buttons are not focused on click (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Clicking_and_focus)
      // Workaround is to:
      // 1. Explicitly focus the dropdown menu item button on `mousedown` event. (see './token_selector_dropdown.vue')
      // 2. Use `nextTick` so `blur` event is fired after the `mousedown` event
      this.$nextTick(() => {
        if (!event.relatedTarget?.closest?.('.dropdown-item')) {
          this.closeDropdown();
        }
      });
    },
    handleEnter() {
      if (this.userDefinedTokenCanBeAdded) {
        this.addToken();
      } else if (this.focusedDropdownItem && this.dropdownIsOpen) {
        this.addToken(this.focusedDropdownItem);
      }
    },
    handleEscape() {
      this.inputText = '';
      this.closeDropdown();
    },
    handleBackspace(event) {
      if (this.inputText !== '' || !this.selectedTokens.length) {
        return;
      }

      // Prevent triggering the browser back button
      event.preventDefault();

      if (this.triggerTokenFocusNextBackspace) {
        this.$refs.textInput.blur();
        this.focusOnToken(this.selectedTokens.length - 1);
      } else {
        this.triggerTokenFocusNextBackspace = true;
      }
    },
    handleInputClick() {
      // Open the dropdown if the user clicks an already focused input
      if (this.inputFocused && this.inputText === '' && !this.dropdownIsOpen) {
        this.openDropdown();
      }
    },
    handleContainerClick(event) {
      // Bail if token is clicked
      const { target } = event;
      if (target?.closest('.gl-token') !== null || this.inputFocused) {
        return;
      }

      this.focusTextInput();
    },
    addToken(dropdownItem = null) {
      const token =
        dropdownItem !== null
          ? dropdownItem
          : {
              id: uniqueId('user-defined-token'),
              name: this.inputText,
            };

      /**
       * Fired when a token is added or removed
       *
       * @property {array} selectedTokens
       */
      this.$emit('input', [...this.selectedTokens, token]);

      this.inputText = '';
      this.closeDropdown();

      /**
       * Fired when a token is added
       *
       * @property {object} token
       */
      this.$emit('token-add', token);
    },
    removeToken(token) {
      /**
       * Fired when user types in the token selector
       *
       * @property {string} inputText
       */
      this.$emit(
        'input',
        this.selectedTokens.filter((selectedToken) => selectedToken.id !== token.id)
      );
      /**
       * Fired when a token is removed
       *
       * @property {object} token
       */
      this.$emit('token-remove', token);
    },
    cancelTokenFocus() {
      this.focusTextInput();
    },
    closeDropdown() {
      this.dropdownIsOpen = false;
      this.resetFocusedDropdownItem();
    },
    openDropdown() {
      if (this.hideDropdown) {
        return;
      }

      this.dropdownIsOpen = true;
    },
    focusTextInput() {
      this.$refs.textInput.focus();
    },

    // Register methods passed as props from child components
    registerDropdownEventHandlers(dropdownEventHandlers) {
      this.dropdownEventHandlers = dropdownEventHandlers;
    },
    registerResetFocusedDropdownItem(resetFocusedDropdownItem) {
      this.resetFocusedDropdownItem = resetFocusedDropdownItem;
    },
    registerFocusOnToken(focusOnToken) {
      this.focusOnToken = focusOnToken;
    },
    clearAll() {
      this.$emit('input', []);
      this.focusTextInput();
    },
  },
};
</script>

<template>
  <div>
    <div
      ref="container"
      class="gl-token-selector gl-form-input gl-display-flex gl-align-items-center form-control form-control-plaintext gl-cursor-text! gl-py-2! gl-px-3!"
      :class="[inputFocused ? 'gl-token-selector-focus-glow' : '', containerClass, stateClass]"
      @click="handleContainerClick"
    >
      <!-- @slot Optional content to display a placeholder when tokens list is empty
        and user doesn't edit tokens -->
      <slot v-if="showEmptyPlaceholder" name="empty-placeholder"></slot>
      <gl-token-container
        :tokens="selectedTokens"
        :state="state"
        :register-focus-on-token="registerFocusOnToken"
        :view-only="viewOnly"
        :show-clear-all-button="showClearAllButton"
        @token-remove="removeToken"
        @cancel-focus="cancelTokenFocus"
        @clear-all="clearAll"
      >
        <template #token-content="{ token }">
          <!-- @slot Content to pass to the token component slot. Can be used
            to add an avatar to the token. Default content is "{{ token.name }}".
               @binding {object} token
          -->
          <slot name="token-content" :token="token"></slot>
        </template>
        <template #text-input>
          <!-- Can't use `v-model` due to this bug: -->
          <!-- https://stackoverflow.com/questions/49929703/vue-js-watched-input-not-fired-on-every-keypress -->
          <input
            ref="textInput"
            type="text"
            class="gl-token-selector-input gl-bg-none gl-font-regular gl-font-base gl-line-height-normal gl-px-1 gl-h-auto gl-text-gray-900 gl-border-none gl-outline-none gl-flex-grow-1 gl-w-40p"
            :value="inputText"
            :autocomplete="autocomplete"
            :aria-labelledby="ariaLabelledby"
            :placeholder="placeholder"
            :disabled="viewOnly"
            v-bind="textInputAttrs"
            @input="inputText = $event.target.value"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown.enter="handleEnter"
            @keydown.esc="handleEscape"
            @keydown.delete="handleBackspace"
            @keydown.up.prevent="dropdownEventHandlers.handleUpArrow"
            @keydown.down.prevent="dropdownEventHandlers.handleDownArrow"
            @keydown.home="dropdownEventHandlers.handleHomeKey"
            @keydown.end="dropdownEventHandlers.handleEndKey"
            @keydown.stop="$emit('keydown', $event)"
            @click="handleInputClick"
          />
        </template>
      </gl-token-container>
    </div>
    <gl-token-selector-dropdown
      v-model="focusedDropdownItem"
      :menu-class="menuClass"
      :show="dropdownIsOpen"
      :loading="loading"
      :dropdown-items="filteredDropdownItems"
      :selected-tokens="selectedTokens"
      :input-text="inputText"
      :allow-user-defined-tokens="allowUserDefinedTokens"
      :component-id="$options.componentId"
      :register-dropdown-event-handlers="registerDropdownEventHandlers"
      :register-reset-focused-dropdown-item="registerResetFocusedDropdownItem"
      @dropdown-item-click="addToken"
      @show="openDropdown"
    >
      <template #loading-content>
        <!-- @slot Content to display when `loading` prop is `true`. Default
          content is "Searching..." -->
        <slot name="loading-content"></slot>
      </template>
      <template #user-defined-token-content>
        <!-- @slot Content to display when adding a user defined token. Default content is 'Add "{{ inputText }}"'.
             @binding {string} inputText
        -->
        <slot name="user-defined-token-content" :input-text="inputText"></slot>
      </template>
      <template #no-results-content>
        <!-- @slot Content to display when `dropdown-items` is empty and
          `allow-user-defined-tokens` is `false`. Default content is "No matches found". -->
        <slot name="no-results-content"></slot>
      </template>
      <template #dropdown-item-content="{ dropdownItem }">
        <!-- @slot Dropdown item content. Default content is "{{ dropdownItem.name }}".
             @binding {object} dropdownItem
        -->
        <slot name="dropdown-item-content" :dropdown-item="dropdownItem"></slot>
      </template>
      <template #dropdown-footer>
        <!-- @slot Content to add to the bottom of the dropdown.
          Can be used in conjunction with `gl-intersection-observer` to load
          more items as the user scrolls.
        -->
        <slot name="dropdown-footer"></slot>
      </template>
    </gl-token-selector-dropdown>
  </div>
</template>
