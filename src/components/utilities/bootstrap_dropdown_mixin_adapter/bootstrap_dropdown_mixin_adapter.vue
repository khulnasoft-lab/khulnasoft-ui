<script>
import dropdownMixin from 'bootstrap-vue/src/mixins/dropdown';

/**
 * This component allows us to reuse the behavior of dropdownMixin
 * without actually mixing it into a component. This way parent
 * components can simply use props and slots to get the desired
 * behavior.
 */
export default {
  // This mixin handles popper and visibility side-effects for dropdowns.
  // https://github.com/bootstrap-vue/bootstrap-vue/blob/v2.20.1/src/mixins/dropdown.js
  //
  // It expects:
  //   - A toggle ref
  //   - A menu ref
  //
  // It adds:
  //   - A number of dropdown props
  //   - A this.visibile state
  //   - A `updatePopper` method
  //
  mixins: [dropdownMixin],
  props: {
    // We need to "sync" the mixin's internal visible state with a prop.
    // Unfortunately, the mixin already takes the name "visible"
    visibleProp: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  watch: {
    visibleProp: {
      immediate: true,
      handler(newVal) {
        this.visible = newVal;
      },
    },
    visible(newVal) {
      if (newVal !== this.visibleProp) {
        this.$emit('update:visibleProp', newVal);
      }
    },
  },
  mounted() {
    // why: Whenever the dropdown slot content changes, we need to update
    //      the popper positioning.
    this.observer = new MutationObserver(() => {
      if (this.visible) {
        this.updatePopper();
      }
    });

    this.observer.observe(this.$refs.menuItemsParent, {
      childList: true,
    });
  },
  destroyed() {
    this.observer.disconnect();
  },
  methods: {
    focusMenu() {
      // what: Overwrite mixin method and do not focus on menu
      // why: For GlTextInputDropdown we want to keep focus on the text input
    },
  },
};
</script>

<template>
  <div>
    <div ref="toggle">
      <slot name="toggle"></slot>
    </div>
    <ul
      ref="menu"
      class="dropdown-menu gl-overflow-y-auto"
      tabindex="-1"
      :class="{ show: visible }"
    >
      <!-- It's not good that we are adding div's under ul's, but this
           is what the existing dropdown component does, so we 
           should be consistent... -->
      <div class="gl-new-dropdown-contents">
        <div ref="menuItemsParent" class="gl-new-dropdown-inner">
          <slot name="menu-items"></slot>
        </div>
      </div>
    </ul>
  </div>
</template>
