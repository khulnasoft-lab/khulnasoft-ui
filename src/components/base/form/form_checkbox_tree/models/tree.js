import { CHECKED_STATE } from './constants';
import { Node } from './node';

export class Tree {
  constructor(options, selected) {
    this.treeDepth = 0;
    this.nodes = {};

    this.initNodes(options, selected);
    this.initIndeterminateStates();
  }

  /**
   * @returns {[Node]} The tree as an array of Node instances
   */
  get nodesList() {
    return Object.values(this.nodes);
  }

  /**
   * @returns {array} The values currently selected
   */
  get selected() {
    return this.nodesList.filter((node) => node.isChecked).map((node) => node.value);
  }

  /**
   * @returns {boolean} Whether all options are checked
   */
  get allOptionsChecked() {
    return this.selected.length === this.nodesList.length;
  }

  /**
   * @returns {boolean} Whether some, but not all options are checked
   */
  get someOptionsChecked() {
    return this.selected.length > 0 && !this.allOptionsChecked;
  }

  /**
   * Creates a flat tree of Node instances.
   * @param {array}  options  The options list
   * @param {array}  selected  Pre-selected option values
   * @param {object} parent The options' parent
   * @param {number} depth  The current depth-level in the tree
   */
  initNodes(options = [], selected = [], parent = null, depth = 0) {
    if (!options.length) {
      return;
    }
    this.treeDepth = depth > this.treeDepth ? depth : this.treeDepth;

    options.forEach((option) => {
      const isChecked = selected.includes(option.value);
      this.nodes[option.value] = new Node({ ...option, parent, isChecked, depth });
      this.initNodes(option.children, selected, option, depth + 1);
    });
  }

  /**
   * Looks for UNCHECKED nodes and sets their checked state to INDETERMINATE if needed. We start
   * with the deepest leaves and we go up level by level to propagate the correct INDETERMINATE
   * states to each parent node.
   */
  initIndeterminateStates() {
    const nodes = [...this.nodesList];
    for (let i = this.treeDepth; i >= 0; i -= 1) {
      const removeIndices = [];
      nodes.forEach((node, nodeIndex) => {
        if (node.depth === i && node.isUnchecked) {
          node.setCheckedState(
            this.optionHasSomeChildrenChecked(node)
              ? CHECKED_STATE.INDETERMINATE
              : node.checkedState
          );
          removeIndices.push(nodeIndex);
        }
      });
      removeIndices.reverse().forEach((index) => {
        nodes.splice(index, 1);
      });
    }
  }

  /**
   * Returns true if all of the option's children are checked, false otherwise.
   * @param {object} option
   * @returns {boolean}
   */
  optionHasAllChildrenChecked(option) {
    return this.getOptionChildren(option).every((child) => child.isChecked);
  }

  /**
   * Returns true if at least one of the option's children is in a checked or indeterminate state,
   * returns false otherwise.
   * We consider the INDETERMINATE state as a checked state so we can propagate INDETERMINATE states
   * to the option's parents.
   * @param {object} option
   * @returns {boolean}
   */
  optionHasSomeChildrenChecked(option) {
    return this.getOptionChildren(option).some((child) => child.isCheckedOrIndeterminate);
  }

  /**
   * Returns the Node instance for a given option's value.
   * @param {number|string} value The option's value
   * @returns {Node}
   */
  getNode(value) {
    return this.nodes[value];
  }

  /**
   * Returns the option's children as Node instances.
   * @param {object} option
   * @returns {[Node]}
   */
  getOptionChildren(option) {
    return option.children.map(({ value }) => this.getNode(value));
  }

  /**
   * Sets a node's state based on whether it got checked or unchecked
   * @param {Node} node The node to be toggled
   * @param {boolean} checked Whether the node should be checked
   */
  static toggleNodeState(node, checked) {
    node.setCheckedState(checked ? CHECKED_STATE.CHECKED : CHECKED_STATE.UNCHECKED);
  }

  /**
   * Toggles all options.
   * @param {boolean} checked Whether the options should be checked or unchecked
   */
  toggleAllOptions(checked) {
    this.nodesList.forEach((node) => {
      Tree.toggleNodeState(node, checked);
    });
  }

  /**
   * Toggles an option's checked state and propagates the state change to the
   * option's parents and children.
   * @param {object} param0 The option to be toggled
   * @param {boolean} checked Whether the option is checked
   * @param {boolean} propagateToParent Whether the state should be propagated to the parents
   */
  toggleOption({ value }, checked, propagateToParent = true) {
    const node = this.getNode(value);
    Tree.toggleNodeState(node, checked);

    if (node.isChild && propagateToParent) {
      this.toggleParentOption(node.parent);
    }

    if (node.isParent) {
      node.children.forEach((child) => this.toggleOption(child, checked, false));
    }
  }

  /**
   * Toggles a parent option's checked state. This is called as a result of a child option being
   * toggled by the user and the change being propagated to that option's parents. This method
   * recursively propagates the state changes to all the ancestors chain until we have reached the
   * tree's trunk.
   * @param {object} param0 The option to be toggled
   */
  toggleParentOption({ value }) {
    const node = this.getNode(value);
    if (this.optionHasAllChildrenChecked(node)) {
      node.checkedState = CHECKED_STATE.CHECKED;
    } else if (this.optionHasSomeChildrenChecked(node)) {
      node.checkedState = CHECKED_STATE.INDETERMINATE;
    } else {
      node.checkedState = CHECKED_STATE.UNCHECKED;
    }

    if (node.isChild) {
      this.toggleParentOption(node.parent);
    }
  }
}
