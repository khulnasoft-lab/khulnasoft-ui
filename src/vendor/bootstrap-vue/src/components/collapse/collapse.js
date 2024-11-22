import { extend } from '../../vue'
import { NAME_COLLAPSE } from '../../constants/components'
import {
  EVENT_NAME_HIDDEN,
  EVENT_NAME_HIDE,
  EVENT_NAME_SHOW,
  EVENT_NAME_SHOWN
} from '../../constants/events'
import { PROP_TYPE_BOOLEAN, PROP_TYPE_STRING } from '../../constants/props'
import { SLOT_NAME_DEFAULT } from '../../constants/slots'
import { getRootActionEventName, getRootEventName } from '../../utils/events'
import { makeModelMixin } from '../../utils/model'
import { sortKeys } from '../../utils/object'
import { makeProp, makePropsConfigurable } from '../../utils/props'
import { idMixin, props as idProps } from '../../mixins/id'
import { listenOnRootMixin } from '../../mixins/listen-on-root'
import { normalizeSlotMixin } from '../../mixins/normalize-slot'
import { BVCollapse } from './helpers/bv-collapse'

// --- Constants ---
const ROOT_ACTION_EVENT_NAME_TOGGLE = getRootActionEventName(NAME_COLLAPSE, 'toggle')
const ROOT_ACTION_EVENT_NAME_REQUEST_STATE = getRootActionEventName(NAME_COLLAPSE, 'request-state')

const ROOT_EVENT_NAME_ACCORDION = getRootEventName(NAME_COLLAPSE, 'accordion')
const ROOT_EVENT_NAME_STATE = getRootEventName(NAME_COLLAPSE, 'state')
const ROOT_EVENT_NAME_SYNC_STATE = getRootEventName(NAME_COLLAPSE, 'sync-state')

const {
  mixin: modelMixin,
  props: modelProps,
  prop: MODEL_PROP_NAME,
  event: MODEL_EVENT_NAME
} = makeModelMixin('visible', { type: PROP_TYPE_BOOLEAN, defaultValue: false })

// --- Props ---

export const props = makePropsConfigurable(
  sortKeys({
    ...idProps,
    ...modelProps,
    // If `true` (and `visible` is `true` on mount), animate initially visible
    accordion: makeProp(PROP_TYPE_STRING),
    appear: makeProp(PROP_TYPE_BOOLEAN, false),
    tag: makeProp(PROP_TYPE_STRING, 'div')
  }),
  NAME_COLLAPSE
)

// --- Main component ---

// @vue/component
export const BCollapse = /*#__PURE__*/ extend({
  name: NAME_COLLAPSE,
  mixins: [idMixin, modelMixin, normalizeSlotMixin, listenOnRootMixin],
  props,
  data() {
    return {
      show: this[MODEL_PROP_NAME],
      transitioning: false
    }
  },
  computed: {
    classObject() {
      const { transitioning } = this

      return {
        collapse: !transitioning,
        show: this.show && !transitioning
      }
    },
    slotScope() {
      return {
        visible: this.show,
        close: () => {
          this.show = false
        }
      }
    }
  },
  watch: {
    [MODEL_PROP_NAME](newValue) {
      if (newValue !== this.show) {
        this.show = newValue
      }
    },
    show(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.emitState()
      }
    }
  },
  created() {
    this.show = this[MODEL_PROP_NAME]
  },
  mounted() {
    this.show = this[MODEL_PROP_NAME]
    // Listen for toggle events to open/close us
    this.listenOnRoot(ROOT_ACTION_EVENT_NAME_TOGGLE, this.handleToggleEvent)
    // Listen to other collapses for accordion events
    this.listenOnRoot(ROOT_EVENT_NAME_ACCORDION, this.handleAccordionEvent)
    this.$nextTick(() => {
      this.emitState()
    })
    // Listen for "Sync state" requests from `v-b-toggle`
    this.listenOnRoot(ROOT_ACTION_EVENT_NAME_REQUEST_STATE, id => {
      if (id === this.safeId()) {
        this.$nextTick(this.emitSync)
      }
    })
  },
  updated() {
    // Emit a private event every time this component updates to ensure
    // the toggle button is in sync with the collapse's state
    // It is emitted regardless if the visible state changes
    this.emitSync()
  },
  beforeDestroy() {
    // Trigger state emit if needed
    this.show = false
  },
  methods: {
    toggle() {
      this.show = !this.show
    },
    onEnter() {
      this.transitioning = true
      // This should be moved out so we can add cancellable events
      this.$emit(EVENT_NAME_SHOW)
    },
    onAfterEnter() {
      this.transitioning = false
      this.$emit(EVENT_NAME_SHOWN)
    },
    onLeave() {
      this.transitioning = true
      // This should be moved out so we can add cancellable events
      this.$emit(EVENT_NAME_HIDE)
    },
    onAfterLeave() {
      this.transitioning = false
      this.$emit(EVENT_NAME_HIDDEN)
    },
    emitState() {
      const { show, accordion } = this
      const id = this.safeId()

      this.$emit(MODEL_EVENT_NAME, show)

      // Let `v-b-toggle` know the state of this collapse
      this.emitOnRoot(ROOT_EVENT_NAME_STATE, id, show)
      if (accordion && show) {
        // Tell the other collapses in this accordion to close
        this.emitOnRoot(ROOT_EVENT_NAME_ACCORDION, id, accordion)
      }
    },
    emitSync() {
      // Emit a private event every time this component updates to ensure
      // the toggle button is in sync with the collapse's state
      // It is emitted regardless if the visible state changes
      this.emitOnRoot(ROOT_EVENT_NAME_SYNC_STATE, this.safeId(), this.show)
    },
    handleToggleEvent(id) {
      if (id === this.safeId()) {
        this.toggle()
      }
    },
    handleAccordionEvent(openedId, openAccordion) {
      const { accordion, show } = this
      if (!accordion || accordion !== openAccordion) {
        return
      }
      const isThis = openedId === this.safeId()
      // Open this collapse if not shown or
      // close this collapse if shown
      if ((isThis && !show) || (!isThis && show)) {
        this.toggle()
      }
    }
  },
  render(h) {
    const { appear } = this

    const $content = h(
      this.tag,
      {
        class: this.classObject,
        directives: [{ name: 'show', value: this.show }],
        attrs: { id: this.safeId() }
      },
      this.normalizeSlot(SLOT_NAME_DEFAULT, this.slotScope)
    )

    return h(
      BVCollapse,
      {
        props: { appear },
        on: {
          enter: this.onEnter,
          afterEnter: this.onAfterEnter,
          leave: this.onLeave,
          afterLeave: this.onAfterLeave
        }
      },
      [$content]
    )
  }
})
