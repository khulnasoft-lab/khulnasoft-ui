/**
 *  Toolbox mixin for the chart based components
 *  this allows for the toolbox that echarts already includes to be rendered,
 *  the mixin also handles the icon customization for the 4 different default
 *  toolbox options
 */

import { getToolboxConfig } from '../../utils/charts/config';

export const ToolboxMixin = {
  props: {
    showToolbox: {
      type: Boolean,
      required: false,
      default: false,
    },
    toolboxZoomIconPath: {
      type: String,
      required: false,
    },
    toolboxBackIconPath: {
      type: String,
      required: false,
    },
    toolboxRestoreIconPath: {
      type: String,
      required: false,
    },
    toolboxSaveAsImageIconPath: {
      type: String,
      required: false,
    },
  },
  computed: {
    toolboxAdjustments() {
      return this.showToolbox
        ? getToolboxConfig({
            restoreIconPath: this.toolboxRestoreIconPath,
            saveImageIconPath: this.toolboxSaveAsImageIconPath,
            zoomIconPath: this.toolboxZoomIconPath,
            backIconPath: this.toolboxBackIconPath,
          })
        : {};
    },
  },
};
