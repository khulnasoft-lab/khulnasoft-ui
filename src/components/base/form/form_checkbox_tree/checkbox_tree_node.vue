<script>
import GlFormCheckbox from '../form_checkbox/form_checkbox.vue';
import { QA_PREFIX } from './models/constants';

export default {
  name: 'GlFormCheckboxTreeNode',
  qaPrefix: QA_PREFIX,
  components: {
    GlFormCheckbox,
  },
  inject: ['tree'],
  props: {
    option: {
      type: Object,
      required: true,
    },
    isNested: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    node() {
      return this.tree.getNode(this.option.value);
    },
    label() {
      return this.node.label || this.node.value;
    },
    rootClass() {
      return this.isNested ? 'gl-ml-6' : null;
    },
    checkboxClass() {
      const { isChecked, isIndeterminate } = this.node;
      return [isChecked && 'js-is-checked', isIndeterminate && 'js-is-indeterminate'];
    },
  },
};
</script>

<template>
  <div :class="rootClass" :data-testid="`${$options.qaPrefix}${option.value}`">
    <gl-form-checkbox
      :checked="node.isChecked"
      :indeterminate="node.isIndeterminate"
      :class="checkboxClass"
      @change="tree.toggleOption(option, $event)"
    >
      {{ label }}
    </gl-form-checkbox>
    <gl-form-checkbox-tree-node
      v-for="child in option.children"
      :key="child.value"
      :option="child"
      is-nested
    />
  </div>
</template>
