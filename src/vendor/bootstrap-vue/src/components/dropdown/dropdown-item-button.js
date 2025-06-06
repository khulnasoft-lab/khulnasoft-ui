import { extend } from '../../vue'
import { NAME_DROPDOWN_ITEM_BUTTON } from '../../constants/components'
import { EVENT_NAME_CLICK } from '../../constants/events'
import {
  PROP_TYPE_ARRAY_OBJECT_STRING,
  PROP_TYPE_BOOLEAN,
  PROP_TYPE_STRING
} from '../../constants/props'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { attrsMixin } from '../../mixins/attrs'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'

// --- Props ---

export const props = makePropsConfigurable(
  {
    active: makeProp(PROP_TYPE_BOOLEAN, false),
    activeClass: makeProp(PROP_TYPE_STRING, 'active'),
    buttonClass: makeProp(PROP_TYPE_ARRAY_OBJECT_STRING),
    disabled: makeProp(PROP_TYPE_BOOLEAN, false),
    variant: makeProp(PROP_TYPE_STRING),
    role: makeProp(PROP_TYPE_STRING, 'menuitem')
  },
  NAME_DROPDOWN_ITEM_BUTTON
)

// --- Main component ---

// @vue/component
export const BDropdownItemButton = /*#__PURE__*/ extend({
  name: NAME_DROPDOWN_ITEM_BUTTON,
  mixins: [attrsMixin, normalizeSlotMixin],
  inject: {
    getBvDropdown: { default: () => () => null }
  },
  inheritAttrs: false,
  props,
  computed: {
    bvDropdown() {
      return this.getBvDropdown()
    },

    computedAttrs() {
      return {
        ...this.bvAttrs,
        role: this.role,
        type: 'button',
        disabled: this.disabled,
        'aria-selected': this.active ? 'true' : null
      }
    }
  },
  methods: {
    closeDropdown() {
      if (this.bvDropdown) {
        this.bvDropdown.hide(true)
      }
    },
    onClick(event) {
      this.$emit(EVENT_NAME_CLICK, event)
      this.closeDropdown()
    }
  },
  render(h) {
    const { active, variant, bvAttrs } = this

    return h(
      'li',
      {
        class: bvAttrs.class,
        style: bvAttrs.style,
        attrs: { role: 'presentation' }
      },
      [
        h(
          'button',
          {
            staticClass: 'dropdown-item',
            class: [
              this.buttonClass,
              {
                [this.activeClass]: active,
                [`text-${variant}`]: variant && !(active || this.disabled)
              }
            ],
            attrs: this.computedAttrs,
            on: { click: this.onClick },
            ref: 'button'
          },
          this.normalizeSlot()
        )
      ]
    )
  }
})
