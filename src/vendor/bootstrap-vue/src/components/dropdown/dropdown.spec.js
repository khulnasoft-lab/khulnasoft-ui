import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BDropdown } from './dropdown'
import { BDropdownItem } from './dropdown-item'

describe('dropdown', () => {
  const originalCreateRange = document.createRange
  const origGetBCR = Element.prototype.getBoundingClientRect

  beforeEach(() => {
    // https://github.com/FezVrasta/popper.js/issues/478#issuecomment-407422016
    // Hack to make Popper not bork out during tests
    // Note popper still does not do any positioning calculation in JSDOM though
    // So we cannot test actual positioning of the menu, just detect when it is open
    document.createRange = () => ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document
      }
    })
    // Mock `getBoundingClientRect()` so that the `isVisible(el)` test returns `true`
    // Needed for keyboard navigation testing
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 24,
      height: 24,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }))
  })

  afterEach(() => {
    // Reset overrides
    document.createRange = originalCreateRange
    Element.prototype.getBoundingClientRect = origGetBCR
  })

  it('has expected default structure', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    // Wait for auto ID to be generated
    await waitNT(wrapper.vm)

    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('b-dropdown')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.attributes('id')).toBeDefined()
    const wrapperId = wrapper.attributes('id')

    expect(wrapper.findAll('button').length).toBe(1)
    const $button = wrapper.find('button')
    expect($button.classes()).toContain('btn')
    expect($button.classes()).toContain('btn-secondary')
    expect($button.classes()).toContain('dropdown-toggle')
    expect($button.classes().length).toBe(3)
    expect($button.attributes('aria-haspopup')).toBeDefined()
    expect($button.attributes('aria-haspopup')).toEqual('menu')
    expect($button.attributes('aria-expanded')).toBeDefined()
    expect($button.attributes('aria-expanded')).toEqual('false')
    expect($button.attributes('id')).toBeDefined()
    expect($button.attributes('id')).toEqual(`${wrapperId}__BV_toggle_`)
    expect($button.text()).toEqual('')

    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.element.tagName).toBe('UL')
    expect($menu.classes().length).toBe(1)
    expect($menu.attributes('role')).toBeDefined()
    expect($menu.attributes('role')).toEqual('menu')
    expect($menu.attributes('tabindex')).toBeDefined()
    expect($menu.attributes('tabindex')).toEqual('-1')
    expect($menu.attributes('aria-labelledby')).toBeDefined()
    expect($menu.attributes('aria-labelledby')).toEqual(`${wrapperId}__BV_toggle_`)
    expect($menu.text()).toEqual('')

    wrapper.destroy()
  })

  it('split mode has expected default structure', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        split: true
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    // Wait for auto ID to be generated
    await waitNT(wrapper.vm)

    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('b-dropdown')
    expect(wrapper.classes().length).toBe(3)
    expect(wrapper.attributes('id')).toBeDefined()
    const wrapperId = wrapper.attributes('id')

    expect(wrapper.findAll('button').length).toBe(2)
    const $buttons = wrapper.findAll('button')
    const $split = $buttons.at(0)
    const $toggle = $buttons.at(1)

    expect($split.classes()).toContain('btn')
    expect($split.classes()).toContain('btn-secondary')
    expect($split.attributes('id')).toBeDefined()
    expect($split.attributes('id')).toEqual(`${wrapperId}__BV_button_`)
    expect($split.attributes('type')).toBeDefined()
    expect($split.attributes('type')).toEqual('button')
    expect($split.text()).toEqual('')

    expect($toggle.classes()).toContain('btn')
    expect($toggle.classes()).toContain('btn-secondary')
    expect($toggle.classes()).toContain('dropdown-toggle')
    expect($toggle.classes()).toContain('dropdown-toggle-split')
    expect($toggle.classes().length).toBe(4)
    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('menu')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($toggle.attributes('id')).toBeDefined()
    expect($toggle.attributes('id')).toEqual(`${wrapperId}__BV_toggle_`)
    expect($toggle.attributes('type')).toBeDefined()
    expect($toggle.attributes('type')).toEqual('button')
    expect($toggle.findAll('span.gl-sr-only').length).toBe(1)
    expect($toggle.find('span.gl-sr-only').text()).toEqual('Toggle dropdown')
    expect($toggle.text()).toEqual('Toggle dropdown')

    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.element.tagName).toBe('UL')
    expect($menu.classes().length).toBe(1)
    expect($menu.attributes('role')).toBeDefined()
    expect($menu.attributes('role')).toEqual('menu')
    expect($menu.attributes('tabindex')).toBeDefined()
    expect($menu.attributes('tabindex')).toEqual('-1')
    expect($menu.attributes('aria-labelledby')).toBeDefined()
    expect($menu.attributes('aria-labelledby')).toEqual(`${wrapperId}__BV_button_`)
    expect($menu.text()).toEqual('')

    wrapper.destroy()
  })

  it('split mode accepts split-button-type value', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        split: true,
        splitButtonType: 'submit'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    await waitNT(wrapper.vm)

    expect(wrapper.classes()).toContain('dropdown')

    expect(wrapper.findAll('button').length).toBe(2)
    const $buttons = wrapper.findAll('button')
    const $split = $buttons.at(0)
    const $toggle = $buttons.at(1)

    expect($split.attributes('type')).toBeDefined()
    expect($split.attributes('type')).toEqual('submit')

    expect($toggle.attributes('type')).toBeDefined()
    expect($toggle.attributes('type')).toEqual('button')

    wrapper.destroy()
  })

  it('renders default slot inside menu', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('renders button-content slot inside toggle button', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      slots: {
        'button-content': 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    expect(wrapper.findAll('button').length).toBe(1)
    expect(wrapper.findAll('.dropdown-toggle').length).toBe(1)
    const $toggle = wrapper.find('.dropdown-toggle')
    expect($toggle.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('renders button-content slot inside split button', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        split: true
      },
      slots: {
        'button-content': 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    expect(wrapper.findAll('button').length).toBe(2)
    const $buttons = wrapper.findAll('button')
    const $split = $buttons.at(0)
    const $toggle = $buttons.at(1)

    expect($split.text()).toEqual('foobar')
    expect($toggle.classes()).toContain('dropdown-toggle')
    // Toggle has `gl-sr-only` hidden text
    expect($toggle.text()).toEqual('Toggle dropdown')

    wrapper.destroy()
  })

  it('does not render default slot inside menu when prop lazy set', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        lazy: true
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.text()).not.toEqual('foobar')

    wrapper.destroy()
  })

  it('has user supplied ID', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        id: 'test'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    expect(wrapper.attributes('id')).toBeDefined()
    expect(wrapper.attributes('id')).toEqual('test')
    const wrapperId = wrapper.attributes('id')

    expect(wrapper.findAll('button').length).toBe(1)
    const $button = wrapper.find('button')
    expect($button.attributes('id')).toEqual(`${wrapperId}__BV_toggle_`)

    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    const $menu = wrapper.find('.dropdown-menu')
    expect($menu.attributes('aria-labelledby')).toBeDefined()
    expect($menu.attributes('aria-labelledby')).toEqual(`${wrapperId}__BV_toggle_`)

    wrapper.destroy()
  })

  it('should not have "btn-group" class when block is true', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        block: true
      }
    })

    expect(wrapper.classes()).not.toContain('btn-group')

    wrapper.destroy()
  })

  it('should have "btn-group" and "gl-flex" classes when block and split are true', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        block: true,
        split: true
      }
    })

    expect(wrapper.classes()).toContain('btn-group')
    expect(wrapper.classes()).toContain('gl-flex')

    wrapper.destroy()
  })

  it('should have "dropdown-toggle-no-caret" class when no-caret is true', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        noCaret: true
      }
    })

    expect(wrapper.find('.dropdown-toggle').classes()).toContain('dropdown-toggle-no-caret')

    wrapper.destroy()
  })

  it('should not have "dropdown-toggle-no-caret" class when no-caret and split are true', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        noCaret: true,
        split: true
      }
    })

    expect(wrapper.find('.dropdown-toggle').classes()).not.toContain('dropdown-toggle-no-caret')

    wrapper.destroy()
  })

  it('should have a toggle with the given toggle tag', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        toggleTag: 'div'
      }
    })

    expect(wrapper.find('.dropdown-toggle').element.tagName).toBe('DIV')

    wrapper.destroy()
  })

  it('should have attributes on toggle when "toggle-attrs" prop is set', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        toggleAttrs: { 'data-foo-bar': 'foo-bar' }
      }
    })

    expect(wrapper.find('.dropdown-toggle').attributes('data-foo-bar')).toBe('foo-bar')

    wrapper.destroy()
  })

  it('should have class dropup when prop dropup set', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        dropup: true
      }
    })

    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('dropup')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).not.toContain('show')

    wrapper.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('dropup')
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).toContain('show')

    wrapper.destroy()
  })

  it('should have class dropright when prop dropright set', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        dropright: true
      }
    })

    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('dropright')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).not.toContain('show')

    wrapper.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('dropright')
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).toContain('show')

    wrapper.destroy()
  })

  it('should have class dropleft when prop dropleft set', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        dropleft: true
      }
    })

    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('dropleft')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).not.toContain('show')

    wrapper.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('dropleft')
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).toContain('show')

    wrapper.destroy()
  })

  it('split should have class specified in split class property', () => {
    const splitClass = 'custom-button-class'
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        splitClass,
        split: true
      }
    })

    const $buttons = wrapper.findAll('button')
    const $split = $buttons.at(0)
    expect($split.classes()).toContain(splitClass)

    wrapper.destroy()
  })

  it('menu should have class dropdown-menu-right when prop right set', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        right: true
      }
    })

    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).not.toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).toContain('dropdown-menu-right')
    expect(wrapper.find('.dropdown-menu').classes()).not.toContain('show')

    wrapper.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.classes()).toContain('dropdown')
    expect(wrapper.classes()).toContain('show')
    expect(wrapper.find('.dropdown-menu').classes()).toContain('dropdown-menu-right')
    expect(wrapper.find('.dropdown-menu').classes()).toContain('show')

    wrapper.destroy()
  })

  it('split mode emits click event when split button clicked', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        split: true
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.emitted('click')).toBeUndefined()

    expect(wrapper.findAll('button').length).toBe(2)
    const $buttons = wrapper.findAll('button')
    const $split = $buttons.at(0)

    await $split.trigger('click')

    expect(wrapper.emitted('click')).toBeDefined()
    expect(wrapper.emitted('click').length).toBe(1)

    wrapper.destroy()
  })

  it('dropdown opens and closes', async () => {
    const App = {
      props: {
        disabled: { type: Boolean, default: false }
      },
      render(h) {
        const { disabled } = this

        return h('div', { attrs: { id: 'container' } }, [
          h(BDropdown, { props: { id: 'test', disabled } }, [h(BDropdownItem, 'item')]),
          h('input', { attrs: { id: 'input' } })
        ])
      }
    }

    const wrapper = mount(App, {
      attachTo: document.body
    })

    expect(wrapper.vm).toBeDefined()

    expect(wrapper.findAll('.dropdown').length).toBe(1)
    expect(wrapper.findAll('.dropdown-toggle').length).toBe(1)
    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    expect(wrapper.findAll('.dropdown-menu .dropdown-item').length).toBe(1)

    const $container = wrapper.find('#container')
    const $dropdown = wrapper.findComponent('.dropdown')
    const $toggle = wrapper.find('.dropdown-toggle')
    const $menu = wrapper.find('.dropdown-menu')
    const $item = wrapper.find('.dropdown-item')
    const $input = wrapper.find('#input')

    expect($dropdown.vm).toBeDefined()

    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('menu')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($dropdown.classes()).not.toContain('show')

    // Open menu by clicking toggle
    await $toggle.trigger('click')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)

    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('menu')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('true')
    expect($dropdown.classes()).toContain('show')
    expect(document.activeElement).toBe($menu.element)

    // Close menu by clicking toggle again
    await $toggle.trigger('click')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($dropdown.classes()).not.toContain('show')

    // Open menu again
    await $toggle.trigger('click')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($toggle.attributes('aria-expanded')).toEqual('true')
    expect(document.activeElement).toBe($menu.element)
    expect($dropdown.classes()).toContain('show')

    // Close by clicking dropdown-item
    await $item.trigger('click')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($dropdown.classes()).not.toContain('show')

    // Open menu via ´.show()´ method
    $dropdown.vm.show()
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($toggle.attributes('aria-expanded')).toEqual('true')
    expect($dropdown.classes()).toContain('show')

    // Close menu via ´.hide()´ method
    $dropdown.vm.hide()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($dropdown.classes()).not.toContain('show')

    // Open menu via ´.show()´ method again
    $dropdown.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($toggle.attributes('aria-expanded')).toEqual('true')
    expect($dropdown.classes()).toContain('show')
    expect(document.activeElement).toBe($menu.element)

    // Close menu by moving focus away from menu
    await $input.trigger('focusin')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($dropdown.classes()).not.toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    // Open menu via keydown.down event on toggle button
    await $toggle.trigger('keydown.down')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($dropdown.classes()).toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('true')
    expect(document.activeElement).toBe($menu.element)

    // Close menu by clicking outside
    await $container.trigger('click')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($dropdown.classes()).not.toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    // Open menu via ´.show()´ method again
    $dropdown.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($dropdown.classes()).toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('true')

    // Close menu by keydown.esc event on dropdown item
    await $item.trigger('keydown.esc')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($dropdown.classes()).not.toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    // Open menu via ´.show()´ method again
    $dropdown.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($dropdown.classes()).toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('true')

    // When disabled changes to true, menu should close
    await wrapper.setProps({ disabled: true })
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($dropdown.classes()).not.toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    // When disabled, show() wont open menu
    $dropdown.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($dropdown.classes()).not.toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    // Re-enable dropdown and open it
    await wrapper.setProps({ disabled: false })
    await waitRAF()
    $dropdown.vm.show()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($dropdown.classes()).toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('true')

    // Should close on root emit when argument is not self
    wrapper.vm.$root.$emit('bv::dropdown::shown')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    expect($dropdown.classes()).not.toContain('show')
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    wrapper.destroy()
  })

  it('preventDefault() works on show event', async () => {
    let prevent = true
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      listeners: {
        show: bvEvent => {
          if (prevent) {
            bvEvent.preventDefault()
          }
        }
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.emitted('show')).toBeUndefined()

    expect(wrapper.findAll('button').length).toBe(1)
    expect(wrapper.findAll('.dropdown').length).toBe(1)
    const $toggle = wrapper.find('button')
    const $dropdown = wrapper.find('.dropdown')

    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('menu')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($dropdown.classes()).not.toContain('show')

    // Should prevent menu from opening
    await $toggle.trigger('click')
    await waitRAF()
    expect(wrapper.emitted('show')).toBeDefined()
    expect(wrapper.emitted('show').length).toBe(1)
    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('menu')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('false')
    expect($dropdown.classes()).not.toContain('show')

    // Allow menu to open
    prevent = false
    await $toggle.trigger('click')
    await waitRAF()
    expect(wrapper.emitted('show')).toBeDefined()
    expect(wrapper.emitted('show').length).toBe(2)
    expect($toggle.attributes('aria-haspopup')).toBeDefined()
    expect($toggle.attributes('aria-haspopup')).toEqual('menu')
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('true')
    expect($dropdown.classes()).toContain('show')

    wrapper.destroy()
  })

  it('Keyboard navigation works when open', async () => {
    const App = {
      render(h) {
        return h('div', [
          h(BDropdown, { props: { id: 'test' } }, [
            h(BDropdownItem, { attrs: { id: 'item-1' } }, 'item'),
            h(BDropdownItem, { attrs: { id: 'item-2' } }, 'item'),
            h(BDropdownItem, { attrs: { id: 'item-3' }, props: { disabled: true } }, 'item'),
            h(BDropdownItem, { attrs: { id: 'item-4' } }, 'item')
          ])
        ])
      }
    }

    const wrapper = mount(App, {
      attachTo: document.body
    })

    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()

    expect(wrapper.findAll('.dropdown').length).toBe(1)
    expect(wrapper.findAll('.dropdown-toggle').length).toBe(1)
    expect(wrapper.findAll('.dropdown-menu').length).toBe(1)
    expect(wrapper.findAll('.dropdown-menu .dropdown-item').length).toBe(4)

    const $toggle = wrapper.find('.dropdown-toggle')
    const $menu = wrapper.find('.dropdown-menu')
    const $items = wrapper.findAll('.dropdown-item')

    // Expect menu to be closed
    expect($toggle.attributes('aria-expanded')).toBeDefined()
    expect($toggle.attributes('aria-expanded')).toEqual('false')

    // Trigger keydown.down on toggle to open menu
    await $toggle.trigger('keydown.down')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect($toggle.attributes('aria-expanded')).toEqual('true')
    expect(document.activeElement).toBe($menu.element)

    // Move to first menu item
    await $menu.trigger('keydown.down')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($items.at(0).element)

    // Move to second menu item
    await $items.at(0).trigger('keydown.down')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($items.at(1).element)

    // Move down to next menu item (should skip disabled item)
    await $items.at(1).trigger('keydown.down')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($items.at(3).element)

    // Move down to next menu item (should remain on same item)
    await $items.at(3).trigger('keydown.down')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($items.at(3).element)

    // Move up to previous menu item (should skip disabled item)
    await $items.at(3).trigger('keydown.up')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($items.at(1).element)

    // Move up to previous menu item
    await $items.at(1).trigger('keydown.up')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($items.at(0).element)

    // Move up to previous menu item (should remain on first item)
    await $items.at(0).trigger('keydown.up')
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.activeElement).toBe($items.at(0).element)

    wrapper.destroy()
  })

  it('when boundary not set should not have class position-static', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body
    })
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.classes()).not.toContain('gl-static')
    wrapper.destroy()
  })

  it('when boundary set to viewport should have class position-static', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        boundary: 'viewport'
      }
    })
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()
    await waitNT(wrapper.vm)
    expect(wrapper.classes()).toContain('gl-static')
    wrapper.destroy()
  })

  it('toggle button size works', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        size: 'lg'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    expect(wrapper.findAll('.btn').length).toBe(1)
    const $toggle = wrapper.find('.btn')

    expect($toggle.element.tagName).toBe('BUTTON')
    expect($toggle.classes()).toContain('btn-lg')

    wrapper.destroy()
  })

  it('split button size works', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        split: true,
        size: 'lg'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    expect(wrapper.findAll('.btn').length).toBe(2)
    const $split = wrapper.findAll('.btn').at(0)
    const $toggle = wrapper.findAll('.btn').at(1)

    expect($split.element.tagName).toBe('BUTTON')
    expect($split.classes()).toContain('btn-lg')
    expect($toggle.element.tagName).toBe('BUTTON')
    expect($toggle.classes()).toContain('btn-lg')

    wrapper.destroy()
  })

  it('toggle button content works', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        text: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    expect(wrapper.findAll('.btn').length).toBe(1)
    const $toggle = wrapper.find('.btn')

    expect($toggle.element.tagName).toBe('BUTTON')
    expect($toggle.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('split button content works', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        split: true,
        text: 'foobar'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    expect(wrapper.findAll('.btn').length).toBe(2)
    const $split = wrapper.findAll('.btn').at(0)

    expect($split.element.tagName).toBe('BUTTON')
    expect($split.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('variant works on non-split button', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        variant: 'primary'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    expect(wrapper.findAll('.btn').length).toBe(1)
    const $toggle = wrapper.find('.btn')

    expect($toggle.element.tagName).toBe('BUTTON')
    expect($toggle.classes()).toContain('btn-primary')
    expect($toggle.classes()).not.toContain('btn-secondary')

    wrapper.destroy()
  })

  it('variant works on split button', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        split: true,
        variant: 'primary'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    expect(wrapper.findAll('.btn').length).toBe(2)
    const $split = wrapper.findAll('.btn').at(0)
    const $toggle = wrapper.findAll('.btn').at(1)

    expect($split.element.tagName).toBe('BUTTON')
    expect($split.classes()).toContain('btn-primary')
    expect($split.classes()).not.toContain('btn-secondary')

    expect($toggle.element.tagName).toBe('BUTTON')
    expect($toggle.classes()).toContain('btn-primary')
    expect($toggle.classes()).not.toContain('btn-secondary')

    // Change split button variant
    await wrapper.setProps({
      splitVariant: 'danger'
    })
    expect($split.classes()).toContain('btn-danger')
    expect($toggle.classes()).toContain('btn-primary')

    wrapper.destroy()
  })

  it('split mode has href when prop split-href set', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        split: true,
        splitHref: '/foo'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    expect(wrapper.findAll('.btn').length).toBe(2)
    const $buttons = wrapper.findAll('.btn')
    const $split = $buttons.at(0)
    const $toggle = $buttons.at(1)

    expect($toggle.element.tagName).toBe('BUTTON')

    expect($split.element.tagName).toBe('A')
    expect($split.classes()).toContain('btn')
    expect($split.classes()).toContain('btn-secondary')
    expect($split.attributes('href')).toBeDefined()
    expect($split.attributes('href')).toEqual('/foo')

    wrapper.destroy()
  })

  it('split mode has href when prop split-to set', async () => {
    const wrapper = mount(BDropdown, {
      attachTo: document.body,
      propsData: {
        split: true,
        splitTo: '/foo'
      }
    })

    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.vm).toBeDefined()

    expect(wrapper.findAll('.btn').length).toBe(2)
    const $buttons = wrapper.findAll('.btn')
    const $split = $buttons.at(0)
    const $toggle = $buttons.at(1)

    expect($toggle.element.tagName).toBe('BUTTON')

    expect($split.element.tagName).toBe('A')
    expect($split.classes()).toContain('btn')
    expect($split.classes()).toContain('btn-secondary')
    expect($split.attributes('href')).toBeDefined()
    expect($split.attributes('href')).toEqual('/foo')

    wrapper.destroy()
  })
})
