import GlButton from '../button/button.vue';
import GlBaseAnimatedIcon from './base_animated_icon.vue';
import GlAnimatedChevronRightDownIcon from './animated_chevron_right_down_icon.vue';
import GlAnimatedDuoChatIcon from './animated_duo_chat_icon.vue';
import GlAnimatedLoaderIcon from './animated_loader_icon.vue';
import GlAnimatedNotificationIcon from './animated_notifications_icon.vue';
import GlAnimatedSidebarIcon from './animated_sidebar_icon.vue';
import GlAnimatedSmileIcon from './animated_smile_icon.vue';
import GlAnimatedSortIcon from './animated_sort_icon.vue';
import GlAnimatedStarIcon from './animated_star_icon.vue';
import GlAnimatedTodoIcon from './animated_todo_icon.vue';
import GlAnimatedUploadIcon from './animated_upload_icon.vue';
import readme from './animated_icon.md';

const MorphTemplate = (args, { argTypes }) => ({
  components: {
    GlButton,
    GlAnimatedChevronRightDownIcon,
    GlAnimatedNotificationIcon,
    GlAnimatedSidebarIcon,
    GlAnimatedSmileIcon,
    GlAnimatedSortIcon,
    GlAnimatedStarIcon,
    GlAnimatedTodoIcon,
  },
  props: Object.keys(argTypes),
  data() {
    return {
      animationsOn: false,
    };
  },
  template: `
  <div class="gl-flex gl-gap-5 gl-flex-wrap hover:gl-cursor-pointer" @click="animationsOn = !animationsOn">
    <div class="gl-p-4 gl-border gl-rounded-base gl-flex gl-flex-col gl-items-center gl-gap-2">
      <gl-animated-todo-icon :aria-label="ariaLabel" name="todo" aria-label="todo checkmark icon" :isOn="animationsOn" />
      todo
    </div>
    <div class="gl-p-4 gl-border gl-rounded-base gl-flex gl-flex-col gl-items-center gl-gap-2">
      <gl-animated-star-icon :aria-label="ariaLabel" name="star" aria-label="favourite star icon" :isOn="animationsOn" />
      star
    </div>
    <div class="gl-p-4 gl-border gl-rounded-base gl-flex gl-flex-col gl-items-center gl-gap-2">
      <gl-animated-sort-icon :aria-label="ariaLabel" name="sort" :isOn="animationsOn" />
      sort
    </div>
    <div class="gl-p-4 gl-border gl-rounded-base gl-flex gl-flex-col gl-items-center gl-gap-2">
      <gl-animated-smile-icon :aria-label="ariaLabel" name="smile" :isOn="animationsOn" />
      smile
    </div>
    <div class="gl-p-4 gl-border gl-rounded-base gl-flex gl-flex-col gl-items-center gl-gap-2">
      <gl-animated-sidebar-icon :aria-label="ariaLabel" name="sidebar" :isOn="animationsOn" />
      sidebar
    </div>
    <div class="gl-py-4 gl-px-5 gl-border gl-rounded-base gl-flex gl-flex-col gl-items-center gl-gap-2">
      <gl-animated-notification-icon :aria-label="ariaLabel" name="notifications" aria-label="notification bell icon" :isOn="animationsOn" />
      notifications
    </div>
    <div class="gl-p-4 gl-border gl-rounded-base gl-flex gl-flex-col gl-items-center gl-gap-2">
      <gl-animated-chevron-right-down-icon :aria-label="ariaLabel" name="chevron_right_down" :isOn="animationsOn" />
      chevron-right-down
    </div>
  </div>`,
});

export const Morph = MorphTemplate.bind({});

const InfiniteTemplate = (args, { argTypes }) => ({
  components: {
    GlButton,
    GlAnimatedDuoChatIcon,
    GlAnimatedLoaderIcon,
    GlAnimatedUploadIcon,
  },
  props: Object.keys(argTypes),
  data() {
    return {
      animationsOn: false,
    };
  },
  template: `
  <div class="gl-flex gl-gap-5 gl-flex-wrap">
    <div class="gl-py-4 gl-px-5 gl-border gl-rounded-base gl-flex gl-flex-col gl-items-center gl-gap-2" @mouseenter="animationsOn = true" @mouseleave="animationsOn = false">
      <gl-animated-upload-icon :aria-label="ariaLabel" name="upload" :isOn="animationsOn" />
      upload
    </div>
    <div class="gl-py-4 gl-px-5 gl-border gl-rounded-base gl-flex gl-flex-col gl-items-center gl-gap-2" @mouseenter="animationsOn = true" @mouseleave="animationsOn = false">
      <gl-animated-duo-chat-icon :aria-label="ariaLabel" name="duo_chat" :isOn="animationsOn" />
      duo-chat
    </div>
    <div class="gl-py-4 gl-px-5 gl-border gl-rounded-base gl-flex gl-flex-col gl-items-center gl-gap-2" @mouseenter="animationsOn = true" @mouseleave="animationsOn = false">
      <gl-animated-loader-icon :aria-label="ariaLabel" name="loader" :isOn="animationsOn" />
      loader
    </div>
  </div>`,
});

export const Infinite = InfiniteTemplate.bind({});

export default {
  title: 'base/animated-icon',
  tags: ['skip-visual-test'],
  component: GlBaseAnimatedIcon,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    isOn: {
      control: { disable: true },
    },
    ariaLabel: {
      control: { disable: true },
    },
  },
};
