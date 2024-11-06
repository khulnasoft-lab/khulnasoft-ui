import { extend, mergeData } from '../../vue'
import { NAME_NAV } from '../../constants/components'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'

// --- Helper methods ---

const computeJustifyContent = value => {
  value = value === 'left' ? 'start' : value === 'right' ? 'end' : value
  return `justify-content-${value}`
}

// --- Props ---

export const props = makePropsConfigurable(
  {
    align: makeProp(PROP_TYPE_STRING),
    // Set to `true` if placing in a card header
    cardHeader: makeProp(PROP_TYPE_BOOLEAN, false),
    fill: makeProp(PROP_TYPE_BOOLEAN, false),
    justified: makeProp(PROP_TYPE_BOOLEAN, false),
    pills: makeProp(PROP_TYPE_BOOLEAN, false),
    small: makeProp(PROP_TYPE_BOOLEAN, false),
    tabs: makeProp(PROP_TYPE_BOOLEAN, false),
    tag: makeProp(PROP_TYPE_STRING, 'ul')
  },
  NAME_NAV
)

// --- Main component ---

// @vue/component
export const BNav = /*#__PURE__*/ extend({
  name: NAME_NAV,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const { tabs, pills, align, cardHeader } = props

    return h(
      props.tag,
      mergeData(data, {
        staticClass: 'nav',
        class: {
          'nav-tabs': tabs,
          'nav-pills': pills && !tabs,
          'card-header-tabs': cardHeader && tabs,
          'card-header-pills': cardHeader && pills && !tabs,
          'nav-fill': props.fill,
          'nav-justified': props.justified,
          [computeJustifyContent(align)]: align,
          small: props.small
        }
      }),
      children
    )
  }
})
