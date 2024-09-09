import { BNav } from './nav'
import { BNavItem } from './nav-item'
import { BNavItemDropdown } from './nav-item-dropdown'
import { DropdownPlugin } from '../dropdown'
import { pluginFactory } from '../../utils/plugins'

const NavPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BNav,
    BNavItem,
    BNavItemDropdown,
    BNavItemDd: BNavItemDropdown,
    BNavDropdown: BNavItemDropdown,
    BNavDd: BNavItemDropdown
  },
  plugins: {
    DropdownPlugin
  }
})

export { NavPlugin, BNav, BNavItem, BNavItemDropdown }
