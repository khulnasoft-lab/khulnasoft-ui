<script>
import GlFormInput from '../form/form_input/form_input.vue';
import BootstrapDropdownMixinAdapter from '../../utilities/bootstrap_dropdown_mixin_adapter/bootstrap_dropdown_mixin_adapter.vue';

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;
const UP_KEY_CODE = 38;
const DOWN_KEY_CODE = 40;

export default {
  components: {
    BootstrapDropdownMixinAdapter,
    GlFormInput,
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    textValue: {
      type: String,
      required: false,
      default: '',
    },
    inputAttrs: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: false,
      focusedIndex: 0,
    };
  },
  computed: {
    maxIndex() {
      return this.items.length - 1;
    },
    focusedItem() {
      return this.items[this.focusedIndex];
    },
  },
  watch: {
    visible(val) {
      // what: Let the parent component know when we are open or closed
      if (val) {
        this.$emit('open');
      } else {
        this.$emit('close');
      }
    },
    maxIndex() {
      // what: Reset the focused element whenever the items length changes
      this.focusedIndex = 0;
    },
  },
  methods: {
    onFocus() {
      this.visible = true;
    },
    onBlur(event) {
      // Do nothing if we're losing focus to one of our dropdown items
      // This shouldn't happen if we're using `GlTextInputDropdownItemDirective`
      // but just in case...
      if (event.relatedTarget && this.$el.contains(event.relatedTarget)) {
        return;
      }

      this.visible = false;
    },
    onInput(val) {
      this.$emit('update:textValue', val);
    },
    increment(val) {
      if (this.maxIndex < 0) {
        return;
      }

      this.focusedIndex = Math.max(0, Math.min(this.focusedIndex + val, this.maxIndex));
    },
    submit() {
      // what: Only submit if we actually have items and the menu is open
      if (this.maxIndex >= 0 && this.visible) {
        this.$emit('submit', {
          index: this.focusedIndex,
          item: this.focusedItem,
        });
      }
    },
    onKeydown(event) {
      if (event.keyCode === DOWN_KEY_CODE) {
        // Prevents moving scrollbar
        event.preventDefault();
        event.stopPropagation();
        // Moves to next index
        this.increment(1);
      } else if (event.keyCode === UP_KEY_CODE) {
        // Prevents moving scrollbar
        event.preventDefault();
        event.stopPropagation();
        // Moves to previous index
        this.increment(-1);
      } else if (event.keyCode === ENTER_KEY_CODE) {
        this.submit();
        event.target.blur();
      } else if (event.keyCode === ESC_KEY_CODE) {
        this.visible = false;
      }
    },
  },
};
</script>

<template>
  <bootstrap-dropdown-mixin-adapter
    class="dropdown b-dropdown gl-new-dropdown"
    :visible-prop.sync="visible"
  >
    <template #toggle>
      <gl-form-input
        ref="input"
        type="text"
        v-bind="inputAttrs"
        :value="textValue"
        @input="onInput"
        @keydown="onKeydown"
        @focus="onFocus"
        @blur="onBlur"
      />
    </template>
    <template #menu-items>
      <slot name="default" v-bind="{ focusedItem, focusedIndex }"></slot>
    </template>
  </bootstrap-dropdown-mixin-adapter>
</template>
