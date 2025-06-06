<script>
import uniqueId from 'lodash/uniqueId';
import isObject from 'lodash/isObject';
import GlDisclosureDropdown from '../../base/new_dropdowns/disclosure/disclosure_dropdown.vue';
import GlIcon from '../../base/icon/icon.vue';
import GlLoadingIcon from '../../base/loading_icon/loading_icon.vue';
import GlPopover from '../../base/popover/popover.vue';
import GlSprintf from '../../utilities/sprintf/sprintf.vue';
import GlLink from '../../base/link/link.vue';
import GlTruncate from '../../utilities/truncate/truncate.vue';

export default {
  name: 'GlDashboardPanel',
  components: {
    GlDisclosureDropdown,
    GlLoadingIcon,
    GlIcon,
    GlPopover,
    GlSprintf,
    GlLink,
    GlTruncate,
  },
  props: {
    containerClass: {
      type: String,
      required: false,
      default: '',
    },
    borderColorClass: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    titleIcon: {
      type: String,
      required: false,
      default: '',
    },
    titleIconClass: {
      type: String,
      required: false,
      default: '',
    },
    titlePopover: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    loadingDelayed: {
      type: Boolean,
      required: false,
      default: false,
    },
    loadingDelayedText: {
      type: String,
      required: false,
      default: '',
    },
    actions: {
      type: Array,
      required: false,
      default: () => [],
      validator: (actions) => actions.every((a) => isObject(a)),
    },
    actionsToggleText: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      panelId: uniqueId('gl-dashboard-panel-id-'),
      titlePopoverId: uniqueId('gl-dashboard-panel-title-popover-id-'),
    };
  },
  computed: {
    borderClass() {
      if (this.borderColorClass?.length > 0) {
        return `gl-border-t-2 gl-border-t-solid ${this.borderColorClass}`;
      }

      return '';
    },
    containerClasses() {
      return `${this.containerClass} ${this.borderClass}`;
    },
    hasTitleIcon() {
      return Boolean(this.titleIcon);
    },
    hasTitle() {
      return Boolean(this.title);
    },
    hasTitlePopover() {
      return Boolean(this.titlePopover?.description);
    },
    hasTitlePopoverLink() {
      return Boolean(this.titlePopover?.descriptionLink);
    },
    shouldShowActions() {
      return this.actions?.length > 0;
    },
    isLoadingDelayed() {
      return this.loadingDelayed && Boolean(this.loadingDelayedText);
    },
  },
};
</script>

<template>
  <div
    :id="panelId"
    class="gl-border gl-h-full !gl-overflow-visible gl-rounded-base gl-bg-white gl-p-4"
    :class="containerClasses"
  >
    <div class="gl-flex gl-h-full gl-flex-col">
      <div class="gl-flex gl-items-start gl-justify-between" data-testid="panel-title">
        <div class="gl-flex gl-items-center gl-overflow-hidden gl-pb-3">
          <gl-icon
            v-if="hasTitleIcon"
            class="gl-mr-1"
            :class="titleIconClass"
            :name="titleIcon"
            data-testid="panel-title-icon"
          />

          <gl-truncate
            v-if="hasTitle"
            class="gl-font-bold gl-text-default"
            :text="title"
            with-tooltip
          />

          <template v-if="hasTitlePopover">
            <gl-icon
              :id="titlePopoverId"
              class="gl-ml-2"
              data-testid="panel-title-popover-icon"
              name="information-o"
              variant="info"
            />
            <gl-popover
              data-testid="panel-title-popover"
              boundary="viewport"
              :target="titlePopoverId"
            >
              <gl-sprintf v-if="hasTitlePopoverLink" :message="titlePopover.description">
                <template #link="{ content }">
                  <gl-link :href="titlePopover.descriptionLink" class="gl-text-sm">{{
                    content
                  }}</gl-link>
                </template>
              </gl-sprintf>
              <template v-else>
                {{ titlePopover.description }}
              </template>
            </gl-popover>
          </template>
        </div>

        <gl-disclosure-dropdown
          v-if="shouldShowActions"
          :items="actions"
          icon="ellipsis_v"
          :toggle-text="actionsToggleText"
          text-sr-only
          no-caret
          placement="bottom-end"
          fluid-width
          toggle-class="gl-ml-1"
          category="tertiary"
          positioning-strategy="fixed"
          @shown="$emit('dropdownOpen')"
          @hidden="$emit('dropdownClosed')"
        >
          <template #list-item="{ item }">
            <span> <gl-icon :name="item.icon" /> {{ item.text }}</span>
          </template>
        </gl-disclosure-dropdown>
      </div>
      <div
        class="gl-grow gl-overflow-y-auto gl-overflow-x-hidden"
        :class="{ 'gl-flex gl-flex-wrap gl-content-center gl-text-center': loading }"
      >
        <template v-if="loading">
          <gl-loading-icon size="lg" class="gl-min-h-8 gl-w-full" />
          <div
            v-if="isLoadingDelayed"
            class="gl-w-full gl-text-subtle"
            data-testId="panel-loading-delayed-indicator"
          >
            {{ loadingDelayedText }}
          </div>
        </template>
        <!-- @slot The panel body to display when not loading. -->
        <slot v-else name="body"></slot>
      </div>
      <slot name="alert-message" :panel-id="panelId"></slot>
    </div>
  </div>
</template>
