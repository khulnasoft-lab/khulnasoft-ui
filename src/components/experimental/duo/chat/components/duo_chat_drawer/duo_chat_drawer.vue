<script>
import GlDrawer from '../../../../../base/drawer/drawer.vue';
import { translate } from '../../../../../../utils/i18n';

export const i18n = {
  DRAWER_TITLE: translate('GlDuoChatDrawer.drawerTitle', 'Chat Threads'),
};

export default {
  name: 'GlDuoChatDrawer',
  components: {
    GlDrawer,
  },
  props: {
    /**
     * Controls whether the drawer is open or closed.
     */
    open: {
      type: Boolean,
      required: true,
    },
    /**
     * Array of chat threads
     */
    threads: {
      type: Array,
      required: true,
      default: () => [],
      validator: (value) =>
        value.every((thread) => thread.id && thread.title && thread.description),
    },
    /**
     * The currently active thread
     */
    activeThread: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      hoveredThread: null,
    };
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
    onThreadClick(thread) {
      this.$emit('thread-selected', thread.id);
    },
    onThreadMouseEnter(thread) {
      this.hoveredThread = thread;
    },
    onThreadMouseLeave() {
      this.hoveredThread = null;
    },
    isActiveThread(thread) {
      return this.activeThread && this.activeThread.title === thread.title;
    },
  },
  i18n,
};
</script>

<template>
  <gl-drawer :open="open" variant="sidebar" class="gl-w-3/4 mt-6" @close="onClose">
    <template #title>
      {{ $options.i18n.DRAWER_TITLE }}
    </template>
    <template #default>
      <ul class="gl-list-style-none gl-pl-0">
        <li
          v-for="thread in threads"
          :key="thread.id"
          class="gl-cursor-pointer gl-px-4 gl-py-3"
          :class="{
            'active-command': isActiveThread(thread) || hoveredThread === thread,
            'gl-text-secondary': !isActiveThread(thread) && hoveredThread !== thread,
          }"
          @click="onThreadClick(thread)"
          @mouseenter="onThreadMouseEnter(thread)"
          @mouseleave="onThreadMouseLeave"
        >
          <h4 class="gl-font-weight-bold gl-mb-2">{{ thread.title }}</h4>
          <p class="gl-mb-0">{{ thread.description }}</p>
        </li>
      </ul>
    </template>
  </gl-drawer>
</template>
