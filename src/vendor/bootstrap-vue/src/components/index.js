import { pluginFactory } from '../utils/plugins'

// Component group plugins
import { ToastPlugin } from './toast'

// Main plugin to install all component group plugins
export const componentsPlugin = /*#__PURE__*/ pluginFactory({
  plugins: {
    ToastPlugin
  }
})
