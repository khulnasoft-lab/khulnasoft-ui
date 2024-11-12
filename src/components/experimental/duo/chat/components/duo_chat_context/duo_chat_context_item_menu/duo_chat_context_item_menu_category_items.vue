<script>
/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import GlDropdownItem from '../../../../../../base/dropdown/dropdown_item.vue';
import GlIcon from '../../../../../../base/icon/icon.vue';
import { categoriesValidator } from '../utils';

export default {
  name: 'GlDuoChatContextItemMenuCategoryItems',
  components: { GlIcon, GlDropdownItem },
  props: {
    categories: {
      type: Array,
      required: true,
      validator: categoriesValidator,
    },
    activeIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    selectCategory(category) {
      this.$emit('select', category);
    },
    setActiveIndex(index) {
      this.$emit('active-index-change', index);
    },
  },
};
</script>
<template>
  <ul class="gl-mb-0 gl-list-none gl-pl-0">
    <gl-dropdown-item
      v-for="(category, index) in categories"
      :key="category.value"
      :class="{ 'active-command': index === activeIndex }"
      data-testid="category-item"
      @click="selectCategory(category)"
    >
      <div class="gl-flex gl-items-center" @mouseenter="setActiveIndex(index)">
        <gl-icon :name="category.icon" class="gl-mr-2" />
        {{ category.label }}
      </div>
    </gl-dropdown-item>
  </ul>
</template>
