import { BCol } from './col'
import { BFormRow } from './form-row'
import { pluginFactory } from '../../utils/plugins'

const LayoutPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BCol,
    BFormRow
  }
})

export { LayoutPlugin, BCol, BFormRow }
