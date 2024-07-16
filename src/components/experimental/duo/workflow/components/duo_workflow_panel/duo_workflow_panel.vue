<script>
import GlIcon from '../../../../../base/icon/icon.vue';
import GlCollapse from '../../../../../base/collapse/collapse.vue';
import GlButton from '../../../../../base/button/button.vue';
import { GlTooltipDirective as GlTooltip } from '../../../../../../directives/tooltip';
import { translate } from '../../../../../../utils/i18n';

export default {
  name: 'GlDuoWorkflowPanel',
  components: { GlCollapse, GlButton, GlIcon },
  directives: { GlTooltip },
  props: {
    /**
     * The icon to show in the header.
     */
    headerIcon: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * The text used as the title and aria-label for the button when the collapse is collapsed
     */
    expandPanelButtonTitle: {
      type: String,
      required: false,
      default: translate('GlDuoWorkflowPanel.expandButtonTitle', 'Expand'),
    },
    /**
     * The text used as the title and aria-label for the button when the collapse is expanded
     */
    collapsePanelButtonTitle: {
      type: String,
      required: false,
      default: translate('GlDuoWorkflowPanel.collapseButtonTitle', 'Collapse'),
    },
  },
  data() {
    return { expanded: true };
  },
  computed: {
    buttonIcon() {
      return this.expanded ? 'chevron-up' : 'chevron-down';
    },
    buttonTitle() {
      return this.expanded ? this.collapsePanelButtonTitle : this.expandPanelButtonTitle;
    },
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
    },
  },
};
</script>
<template>
  <div>
    <div class="gl-flex gl-flex-nowrap gl-items-center">
      <gl-icon v-if="headerIcon" :name="headerIcon" :size="24" class="gl-mr-3" />
      <div class="gl-flex gl-flex-grow gl-items-baseline">
        <h2 class="gl-mb-0">
          <!-- @slot Panel title. -->
          <slot name="title"></slot>
        </h2>
        <small class="gl-ml-3">
          <!-- @slot Panel subtitle. -->
          <slot name="subtitle"></slot
        ></small>
      </div>

      <gl-button
        v-gl-tooltip
        category="tertiary"
        :icon="buttonIcon"
        :title="buttonTitle"
        :aria-label="buttonTitle"
        @click="toggleExpanded"
      />
    </div>
    <gl-collapse :visible="expanded">
      <div class="gl-ml-7 gl-mt-4 gl-flex-grow">
        <!-- @slot Panel content. -->
        <slot name="content"></slot>
      </div>
    </gl-collapse>
  </div>
</template>
