<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { clamp, uniqueId } from 'lodash';
import { stopEvent } from '../../../../utils/utils';
import {
  GL_DROPDOWN_SHOWN,
  GL_DROPDOWN_HIDDEN,
  HOME,
  END,
  ARROW_DOWN,
  ARROW_UP,
} from '../constants';
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  dropdownVariantOptions,
} from '../../../../utils/constants';
import GlBaseDropdown from '../base_dropdown/base_dropdown.vue';
import GlDisclosureDropdownItem, { ITEM_CLASS } from './disclosure_dropdown_item.vue';
import GlDisclosureDropdownGroup from './disclosure_dropdown_group.vue';
import { itemsValidator, isItem, isAllItems, isAllGroups } from './utils';

export default {
  events: {
    GL_DROPDOWN_SHOWN,
    GL_DROPDOWN_HIDDEN,
  },
  components: {
    GlBaseDropdown,
    GlDisclosureDropdownItem,
    GlDisclosureDropdownGroup,
  },
  props: {
    /**
     * Items to display in the dropdown
     */
    items: {
      type: Array,
      required: false,
      default: () => [],
      validator: itemsValidator,
    },
    /**
     * Toggle button text
     */
    toggleText: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Toggle text to be read by screen readers only
     */
    textSrOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Styling option - dropdown's toggle category
     */
    category: {
      type: String,
      required: false,
      default: buttonCategoryOptions.primary,
      validator: (value) => value in buttonCategoryOptions,
    },
    /**
     * Styling option - dropdown's toggle variant
     */
    variant: {
      type: String,
      required: false,
      default: dropdownVariantOptions.default,
      validator: (value) => value in dropdownVariantOptions,
    },
    /**
     * The size of the dropdown toggle
     */
    size: {
      type: String,
      required: false,
      default: 'medium',
      validator: (value) => value in buttonSizeOptions,
    },
    /**
     * Icon name that will be rendered in the toggle button
     */
    icon: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Set to "true" to disable the dropdown
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Set to "true" when dropdown content (items) is loading
     * It will render a small loader in the dropdown toggle and make it disabled
     */
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Additional CSS classes to customize toggle appearance
     */
    toggleClass: {
      type: [String, Array, Object],
      required: false,
      default: null,
    },
    /**
     * Set to "true" to hide the caret
     */
    noCaret: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Right align disclosure dropdown with respect to the toggle button
     */
    right: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * The `aria-labelledby` attribute value for the toggle button
     * Provide the string of ids seperated by space
     */
    toggleAriaLabelledBy: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * The `aria-labelledby` attribute value for the list of options
     * Provide the string of ids seperated by space
     */
    listAriaLabelledBy: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      toggleId: uniqueId('dropdown-toggle-btn-'),
      disclosureId: uniqueId('disclosure-'),
      nextFocusedItemIndex: null,
    };
  },
  computed: {
    disclosureOptions() {
      if (this.items) {
        if (isAllItems(this.items)) {
          return {
            tag: 'ul',
          };
        }

        if (isAllGroups(this.items))
          return {
            tag: 'div',
            role: 'group',
          };
      }

      return { tag: 'div' };
    },
    hasCustomToggle() {
      return Boolean(this.$scopedSlots.toggle);
    },
  },
  methods: {
    open() {
      this.$refs.baseDropdown.open();
    },
    close() {
      this.$refs.baseDropdown.close();
    },
    onShow() {
      const items = this.getFocusableListItemElements();

      if (items.length) {
        this.focusItem(0, items);
      }

      /**
       * Emitted when dropdown is shown
       *
       * @event shown
       */
      this.$emit(GL_DROPDOWN_SHOWN);
    },
    onHide() {
      /**
       * Emitted when dropdown is hidden
       *
       * @event hidden
       */
      this.$emit(GL_DROPDOWN_HIDDEN);
      this.nextFocusedItemIndex = null;
    },
    onKeydown(event) {
      const { code } = event;
      const elements = this.getFocusableListItemElements();

      if (elements.length < 1) return;

      let stop = true;

      if (code === HOME) {
        this.focusItem(0, elements);
      } else if (code === END) {
        this.focusItem(elements.length - 1, elements);
      } else if (code === ARROW_UP) {
        this.focusNextItem(event, elements, -1);
      } else if (code === ARROW_DOWN) {
        this.focusNextItem(event, elements, 1);
      } else {
        stop = false;
      }

      if (stop) {
        stopEvent(event);
      }
    },
    getFocusableListItemElements() {
      const items = this.$refs.content?.querySelectorAll(`.${ITEM_CLASS}`);
      return Array.from(items || []);
    },
    focusNextItem(event, elements, offset) {
      const { target } = event;
      const currentIndex = elements.indexOf(target);
      const nextIndex = clamp(currentIndex + offset, 0, elements.length - 1);

      this.focusItem(nextIndex, elements);
    },
    focusItem(index, elements) {
      this.nextFocusedItemIndex = index;

      elements[index]?.focus();
    },
    closeAndFocus() {
      this.$refs.baseDropdown.closeAndFocus();
    },
    handleAction(action) {
      /**
       * Emitted when one of disclosure dropdown items is clicked
       *
       * @event action
       */
      this.$emit('action', action);
    },
    isItem,
  },
};
</script>

<template>
  <gl-base-dropdown
    ref="baseDropdown"
    :aria-labelledby="toggleAriaLabelledBy"
    :toggle-id="toggleId"
    :toggle-text="toggleText"
    :toggle-class="toggleClass"
    :text-sr-only="textSrOnly"
    :category="category"
    :variant="variant"
    :size="size"
    :icon="icon"
    :disabled="disabled"
    :loading="loading"
    :no-caret="noCaret"
    :right="right"
    class="gl-disclosure-dropdown"
    @[$options.events.GL_DROPDOWN_SHOWN]="onShow"
    @[$options.events.GL_DROPDOWN_HIDDEN]="onHide"
  >
    <template v-if="hasCustomToggle" #toggle>
      <!-- @slot Custom toggle content -->
      <slot name="toggle"></slot>
    </template>

    <!-- @slot Content to display in dropdown header -->
    <slot name="header"></slot>

    <component
      :is="disclosureOptions.tag"
      :id="disclosureId"
      ref="content"
      :role="disclosureOptions.role"
      :aria-labelledby="listAriaLabelledBy || toggleId"
      data-testid="disclosure-content"
      class="gl-dropdown-contents gl-list-style-none gl-pl-0 gl-mb-0"
      tabindex="-1"
      @keydown="onKeydown"
    >
      <slot>
        <template v-for="(item, index) in items">
          <template v-if="isItem(item)">
            <gl-disclosure-dropdown-item :key="item.text" :item="item" @action="handleAction">
              <!-- @slot Custom template of the disclosure dropdown item -->
              <slot name="list-item" :item="item"></slot>
            </gl-disclosure-dropdown-item>
          </template>

          <template v-else>
            <gl-disclosure-dropdown-group
              :key="item.name"
              :bordered="index !== 0"
              :group="item"
              @action="handleAction"
            >
              <template v-if="$scopedSlots['group-label']" #group-label>
                <!-- @slot Custom template for group names -->
                <slot name="group-label" :group="item"></slot>
              </template>

              <template v-if="$scopedSlots['list-item']">
                <gl-disclosure-dropdown-item
                  v-for="groupItem in item.items"
                  :key="groupItem.text"
                  @action="handleAction"
                >
                  <!-- @slot Custom template of the disclosure dropdown item -->
                  <slot name="list-item" :item="groupItem"></slot>
                </gl-disclosure-dropdown-item>
              </template>
            </gl-disclosure-dropdown-group>
          </template>
        </template>
      </slot>
    </component>

    <!-- @slot Content to display in dropdown footer -->
    <slot name="footer"></slot>
  </gl-base-dropdown>
</template>
