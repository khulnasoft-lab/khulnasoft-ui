import { BNavbar } from './navbar'
import { BNavbarBrand } from './navbar-brand'
import { NavPlugin } from '../nav'
import { CollapsePlugin } from '../collapse'
import { DropdownPlugin } from '../dropdown'
import { pluginFactory } from '../../utils/plugins'

const NavbarPlugin = /*#__PURE__*/ pluginFactory({
  components: {
    BNavbar,
    BNavbarBrand
  },
  plugins: {
    NavPlugin,
    CollapsePlugin,
    DropdownPlugin
  }
})

export { NavbarPlugin, BNavbar, BNavbarBrand }
