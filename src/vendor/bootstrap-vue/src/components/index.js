import { pluginFactory } from '../utils/plugins'

// Component group plugins
import { BadgePlugin } from './badge'
import { BreadcrumbPlugin } from './breadcrumb'
import { ButtonPlugin } from './button'
import { ButtonGroupPlugin } from './button-group'
import { CollapsePlugin } from './collapse'
import { DropdownPlugin } from './dropdown'
import { FormPlugin } from './form'
import { FormCheckboxPlugin } from './form-checkbox'
import { FormGroupPlugin } from './form-group'
import { FormInputPlugin } from './form-input'
import { FormRadioPlugin } from './form-radio'
import { FormSelectPlugin } from './form-select'
import { FormTextareaPlugin } from './form-textarea'
import { InputGroupPlugin } from './input-group'
import { LayoutPlugin } from './layout'
import { LinkPlugin } from './link'
import { ModalPlugin } from './modal'
import { NavPlugin } from './nav'
import { NavbarPlugin } from './navbar'
import { PopoverPlugin } from './popover'
import { ProgressPlugin } from './progress'
// Table plugin includes TableLitePlugin and TableSimplePlugin
import { TablePlugin } from './table'
import { TabsPlugin } from './tabs'
import { ToastPlugin } from './toast'
import { TooltipPlugin } from './tooltip'

// Main plugin to install all component group plugins
export const componentsPlugin = /*#__PURE__*/ pluginFactory({
  plugins: {
    BadgePlugin,
    BreadcrumbPlugin,
    ButtonPlugin,
    ButtonGroupPlugin,
    CollapsePlugin,
    DropdownPlugin,
    FormPlugin,
    FormCheckboxPlugin,
    FormGroupPlugin,
    FormInputPlugin,
    FormRadioPlugin,
    FormSelectPlugin,
    FormTextareaPlugin,
    InputGroupPlugin,
    LayoutPlugin,
    LinkPlugin,
    ModalPlugin,
    NavPlugin,
    NavbarPlugin,
    PopoverPlugin,
    ProgressPlugin,
    TablePlugin,
    TabsPlugin,
    ToastPlugin,
    TooltipPlugin
  }
})
