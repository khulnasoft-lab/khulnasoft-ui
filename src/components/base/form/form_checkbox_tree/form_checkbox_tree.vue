<script>
import GlFormCheckbox from '../form_checkbox/form_checkbox.vue';
import GlFormGroup from '../form_group/form_group.vue';
import GlFormCheckboxTreeNode from './checkbox_tree_node.vue';
import { V_MODEL } from './models/constants';
import { Tree } from './models/tree';

export default {
  name: 'GlFormCheckboxTree',
  components: {
    GlFormGroup,
    GlFormCheckbox,
    GlFormCheckboxTreeNode,
  },
  provide() {
    return {
      tree: this.tree,
    };
  },
  model: {
    prop: V_MODEL.PROP,
    event: V_MODEL.EVENT,
  },
  props: {
    /**
     * Options tree where each option is in the form:
     * {
     *  value: String|Number,
     *  label: String,
     *  children: Array,
     * }
     */
    options: {
      type: Array,
      required: true,
    },
    /**
     * The selected options as an array of values
     */
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
    /**
     * Set to true to hide the "Select/unselect all" checkbox
     */
    hideToggleAll: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Label for the toggle all checkbox when some or all options are unchecked
     */
    selectAllLabel: {
      type: String,
      required: false,
      default: 'Select all',
    },
    /**
     * Label for the toggle all checkbox when all options are checked
     */
    unselectAllLabel: {
      type: String,
      required: false,
      default: 'Unselect all',
    },
    label: {
      type: String,
      required: false,
      default: 'Checkbox tree',
    },
    labelSrOnly: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      tree: new Tree(this.options, this.value),
    };
  },
  computed: {
    toggleAllLabel() {
      return this.tree.allOptionsChecked ? this.unselectAllLabel : this.selectAllLabel;
    },
  },
  watch: {
    'tree.selected': {
      handler(selected) {
        /**
         * Emitted when the selection changes.
         */
        this.$emit(V_MODEL.EVENT, selected);
      },
    },
  },
};
</script>

<template>
  <gl-form-group :label="label" :label-sr-only="labelSrOnly">
    <gl-form-checkbox
      v-if="!hideToggleAll"
      class="gl-form-checkbox-tree-toggle-all"
      :checked="tree.allOptionsChecked"
      :indeterminate="tree.someOptionsChecked"
      @change="tree.toggleAllOptions($event)"
    >
      {{ toggleAllLabel }}
    </gl-form-checkbox>
    <gl-form-checkbox-tree-node v-for="option in options" :key="option.value" :option="option" />
  </gl-form-group>
</template>
