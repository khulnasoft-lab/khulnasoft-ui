<script>
import GlDropdownItem from '../dropdown/dropdown_item.vue';
import GlIcon from '../icon/icon.vue';

/**
 * Sorting Item
 *
 * NOTE: This component is deprecated. Instead, use the `sortOptions` prop of
 * `GlSorting`.
 *
 * This is written as a functional component because it is a simple wrapper over
 * the GlDropdownItem component and does not use internal state. Functional
 * components are cheaper to render and often used as wrappers like this. We're
 * not using the <template functional> syntax here because it does not support
 * custom child components wihtout extra work inside GitLab or extra work
 * required by the user.
 */

export default {
  name: 'GlSortingItem',
  functional: true,
  props: {
    /**
     * Adds a check mark next to the item to indicate it is active.
     */
    active: {
      type: Boolean,
      default: false,
      required: false,
    },
    /**
     * If given, makes the item a link pointing to the given value. Otherwise,
     * the item is a button.
     */
    href: {
      type: String,
      default: null,
      required: false,
    },
  },
  /**
   * The content of the item.
   * @slot default
   */
  render(createElement, { scopedSlots, data, props = {} }) {
    const classNames = `gl-sorting-item js-active-icon gl-flex-shrink-0 gl-mr-2 ${
      props.active ? '' : 'inactive gl-visibility-hidden'
    }`;
    const icon = createElement(GlIcon, {
      class: classNames,
      attrs: {
        name: 'mobile-issue-close',
        size: 16,
        ariaLabel: 'Selected',
      },
    });

    return createElement(GlDropdownItem, {
      ...data,
      attrs: {
        ...props,
      },
      scopedSlots: {
        default: () => [icon, scopedSlots.default?.()],
      },
    });
  },
};
</script>
