import { mount } from '@vue/test-utils'
import { waitNT, waitRAF } from '../../../tests/utils'
import { BFormCheckbox } from './form-checkbox'

describe('form-checkbox', () => {
  // --- Custom checkbox structure, class and attributes tests ---

  it('default has structure <div><input><label></label></div>', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: '',
        value: 'a'
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')

    const $children = wrapper.element.children
    expect($children.length).toEqual(2)
    expect($children[0].tagName).toEqual('INPUT')
    expect($children[1].tagName).toEqual('LABEL')

    wrapper.destroy()
  })

  it('default has wrapper class custom-control and custom-checkbox', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: '',
        value: 'a'
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.classes().length).toEqual(2)
    expect(wrapper.classes()).toContain('custom-control')
    expect(wrapper.classes()).toContain('custom-checkbox')

    wrapper.destroy()
  })

  it('default has input type checkbox', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: '',
        value: 'a'
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('type')).toBeDefined()
    expect($input.attributes('type')).toEqual('checkbox')

    wrapper.destroy()
  })

  it('default does not have aria-label attribute on input', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.find('input').attributes('aria-label')).toBeUndefined()

    wrapper.destroy()
  })

  it('has aria-label attribute on input when aria-label provided', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false,
        ariaLabel: 'bar'
      },
      slots: {
        default: 'foo'
      }
    })

    expect(wrapper.find('input').attributes('aria-label')).toBe('bar')

    wrapper.destroy()
  })

  it('default has input class custom-control-input', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.classes().length).toEqual(1)
    expect($input.classes()).toContain('custom-control-input')
    expect($input.classes()).not.toContain('position-static')

    wrapper.destroy()
  })

  it('default has label class custom-control-label', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $label = wrapper.find('label')
    expect($label.classes().length).toEqual(1)
    expect($label.classes()).toContain('custom-control-label')

    wrapper.destroy()
  })

  it('has default slot content in label', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $label = wrapper.find('label')
    expect($label.text()).toEqual('foobar')

    wrapper.destroy()
  })

  it('default has no disabled attribute on input', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('disabled')).toBeUndefined()

    wrapper.destroy()
  })

  it('has disabled attribute on input when prop disabled set', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false,
        disabled: true
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('disabled')).toBeDefined()

    wrapper.destroy()
  })

  it('default has no required attribute on input', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('required')).toBeUndefined()

    wrapper.destroy()
  })

  it('does not have required attribute on input when prop required set and name prop not provided', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false,
        required: true
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('required')).toBeUndefined()

    wrapper.destroy()
  })

  it('has required attribute on input when prop required and name set', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false,
        name: 'test',
        required: true
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('required')).toBeDefined()

    wrapper.destroy()
  })

  it('default has no name attribute on input', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('name')).toBeUndefined()

    wrapper.destroy()
  })

  it('has name attribute on input when name prop set', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false,
        name: 'test'
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('name')).toBeDefined()
    expect($input.attributes('name')).toEqual('test')

    wrapper.destroy()
  })

  it('default has no form attribute on input', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('form')).toBeUndefined()

    wrapper.destroy()
  })

  it('has form attribute on input when form prop set', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false,
        form: 'test'
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('form')).toBeDefined()
    expect($input.attributes('form')).toEqual('test')

    wrapper.destroy()
  })

  it('has custom attributes transferred to input element', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        id: 'foo',
        foo: 'bar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('foo')).toBeDefined()
    expect($input.attributes('foo')).toEqual('bar')

    wrapper.destroy()
  })

  it('default has class custom-control-inline when prop inline=true', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false,
        inline: true
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.classes().length).toEqual(3)
    expect(wrapper.classes()).toContain('custom-checkbox')
    expect(wrapper.classes()).toContain('custom-control')
    expect(wrapper.classes()).toContain('custom-control-inline')

    wrapper.destroy()
  })

  it('default has no input validation classes by default', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input).toBeDefined()
    expect($input.classes()).not.toContain('is-invalid')
    expect($input.classes()).not.toContain('is-valid')

    wrapper.destroy()
  })

  it('default has no input validation classes when state=null', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        state: null,
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input).toBeDefined()
    expect($input.classes()).not.toContain('is-invalid')
    expect($input.classes()).not.toContain('is-valid')

    wrapper.destroy()
  })

  it('default has input validation class is-valid when state=true', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        state: true,
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input).toBeDefined()
    expect($input.classes()).not.toContain('is-invalid')
    expect($input.classes()).toContain('is-valid')

    wrapper.destroy()
  })

  it('default has input validation class is-invalid when state=false', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        state: false,
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input).toBeDefined()
    expect($input.classes()).toContain('is-invalid')
    expect($input.classes()).not.toContain('is-valid')

    wrapper.destroy()
  })

  // --- Switch styling - stand alone ---

  it('switch has structure <div><input><label></label></div>', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        switch: true,
        checked: '',
        value: 'a'
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper).toBeDefined()
    expect(wrapper.element.tagName).toBe('DIV')

    const $children = wrapper.element.children
    expect($children.length).toEqual(2)
    expect($children[0].tagName).toEqual('INPUT')
    expect($children[1].tagName).toEqual('LABEL')

    wrapper.destroy()
  })

  it('switch has wrapper classes custom-control and custom-switch', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        switch: true,
        checked: '',
        value: 'a'
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.classes().length).toEqual(2)
    expect(wrapper.classes()).toContain('custom-control')
    expect(wrapper.classes()).toContain('custom-switch')

    wrapper.destroy()
  })

  it('switch has input type checkbox', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        switch: true,
        checked: '',
        value: 'a'
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.attributes('type')).toBeDefined()
    expect($input.attributes('type')).toEqual('checkbox')

    wrapper.destroy()
  })

  it('switch has input class custom-control-input', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        switch: true,
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input.classes().length).toEqual(1)
    expect($input.classes()).toContain('custom-control-input')

    wrapper.destroy()
  })

  it('switch has label class custom-control-label', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        switch: true,
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $label = wrapper.find('label')
    expect($label.classes().length).toEqual(1)
    expect($label.classes()).toContain('custom-control-label')

    wrapper.destroy()
  })

  // --- Indeterminate testing ---

  it('does not have input indeterminate set by default', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input).toBeDefined()
    expect($input.element.indeterminate).toBe(false)

    wrapper.destroy()
  })

  it('has input indeterminate set by when indeterminate=true', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false,
        indeterminate: true
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input).toBeDefined()
    expect($input.element.indeterminate).toBe(true)

    wrapper.destroy()
  })

  it('has input indeterminate set by when indeterminate set to true after mount', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false,
        indeterminate: false
      },
      slots: {
        default: 'foobar'
      }
    })

    const $input = wrapper.find('input')
    expect($input).toBeDefined()
    expect($input.element.indeterminate).toBe(false)

    await wrapper.setProps({ indeterminate: true })
    expect($input.element.indeterminate).toBe(true)

    await wrapper.setProps({ indeterminate: false })
    expect($input.element.indeterminate).toBe(false)

    wrapper.destroy()
  })

  // --- Functionality testing ---

  it('default has internal localChecked=false when prop checked=false', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toEqual(false)

    wrapper.destroy()
  })

  it('default has internal localChecked=true when prop checked=true', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        checked: true
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toEqual(true)

    wrapper.destroy()
  })

  it('default has internal localChecked null', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        uncheckedValue: 'foo',
        value: 'bar'
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toBe(null)

    wrapper.destroy()
  })

  it('default has internal localChecked set to checked prop', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        uncheckedValue: 'foo',
        value: 'bar',
        checked: ''
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toEqual('')

    wrapper.destroy()
  })

  it('default has internal localChecked set to value when checked=value', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        uncheckedValue: 'foo',
        value: 'bar',
        checked: 'bar'
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toEqual('bar')

    wrapper.destroy()
  })

  it('default has internal localChecked set to value when checked changed to value', async () => {
    const wrapper = mount(BFormCheckbox, {
      propsData: {
        uncheckedValue: 'foo',
        value: 'bar'
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toBe(null)

    await wrapper.setProps({ checked: 'bar' })
    expect(wrapper.vm.localChecked).toEqual('bar')
    expect(wrapper.emitted('input')).toBeDefined()

    const $last = wrapper.emitted('input').length - 1
    expect(wrapper.emitted('input')[$last]).toBeDefined()
    expect(wrapper.emitted('input')[$last][0]).toEqual('bar')

    wrapper.destroy()
  })

  it('emits a change event when clicked', async () => {
    const wrapper = mount(BFormCheckbox, {
      attachTo: document.body,
      propsData: {
        uncheckedValue: 'foo',
        value: 'bar'
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(wrapper.vm.localChecked).toBe(null)
    expect(wrapper.emitted('change')).toBeUndefined()

    const $input = wrapper.find('input')
    expect($input).toBeDefined()

    await $input.trigger('click')
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(1)
    expect(wrapper.emitted('change')[0][0]).toEqual('bar')

    await $input.trigger('click')
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(2)
    expect(wrapper.emitted('change')[1][0]).toEqual('foo')

    wrapper.destroy()
  })

  it('works when v-model bound to an array', async () => {
    const wrapper = mount(BFormCheckbox, {
      attachTo: document.body,
      propsData: {
        value: 'bar',
        checked: ['foo']
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(Array.isArray(wrapper.vm.localChecked)).toBe(true)
    expect(wrapper.vm.localChecked.length).toBe(1)
    expect(wrapper.vm.localChecked[0]).toEqual('foo')

    const $input = wrapper.find('input')
    expect($input).toBeDefined()

    await $input.trigger('click')
    expect(Array.isArray(wrapper.vm.localChecked)).toBe(true)
    expect(wrapper.vm.localChecked.length).toBe(2)
    expect(wrapper.vm.localChecked[0]).toEqual('foo')
    expect(wrapper.vm.localChecked[1]).toEqual('bar')
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(1)
    expect(wrapper.emitted('change')[0][0]).toEqual(['foo', 'bar'])

    await $input.trigger('click')
    expect(Array.isArray(wrapper.vm.localChecked)).toBe(true)
    expect(wrapper.vm.localChecked.length).toBe(1)
    expect(wrapper.vm.localChecked[0]).toEqual('foo')
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(2)
    expect(wrapper.emitted('change')[1][0]).toEqual(['foo'])

    await wrapper.setProps({ checked: [] })
    expect(Array.isArray(wrapper.vm.localChecked)).toBe(true)
    expect(wrapper.vm.localChecked.length).toBe(0)
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(2)

    await $input.trigger('click')
    expect(Array.isArray(wrapper.vm.localChecked)).toBe(true)
    expect(wrapper.vm.localChecked.length).toBe(1)
    expect(wrapper.vm.localChecked[0]).toEqual('bar')
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(3)
    expect(wrapper.emitted('change')[2][0]).toEqual(['bar'])

    await $input.trigger('click')
    expect(Array.isArray(wrapper.vm.localChecked)).toBe(true)
    expect(wrapper.vm.localChecked.length).toBe(0)
    expect(wrapper.emitted('change')).toBeDefined()
    expect(wrapper.emitted('change').length).toBe(4)
    expect(wrapper.emitted('change')[3][0]).toEqual([])

    wrapper.destroy()
  })

  it('works when value is an object', async () => {
    const wrapper = mount(BFormCheckbox, {
      attachTo: document.body,
      propsData: {
        value: { bar: 1, baz: 2 },
        checked: ['foo']
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.vm.localChecked).toBeDefined()
    expect(Array.isArray(wrapper.vm.localChecked)).toBe(true)
    expect(wrapper.vm.localChecked.length).toBe(1)
    expect(wrapper.vm.localChecked[0]).toEqual('foo')

    const $input = wrapper.find('input')
    expect($input).toBeDefined()

    await $input.trigger('click')
    expect(Array.isArray(wrapper.vm.localChecked)).toBe(true)
    expect(wrapper.vm.localChecked.length).toBe(2)
    expect(wrapper.vm.localChecked[0]).toEqual('foo')
    expect(wrapper.vm.localChecked[1]).toEqual({ bar: 1, baz: 2 })

    await $input.trigger('click')
    expect(Array.isArray(wrapper.vm.localChecked)).toBe(true)
    expect(wrapper.vm.localChecked.length).toBe(1)
    expect(wrapper.vm.localChecked[0]).toEqual('foo')

    wrapper.destroy()
  })

  it('focus() and blur() methods work', async () => {
    const wrapper = mount(BFormCheckbox, {
      attachTo: document.body,
      propsData: {
        checked: false
      },
      slots: {
        default: 'foobar'
      }
    })

    expect(wrapper.vm).toBeDefined()

    const $input = wrapper.find('input')
    expect($input).toBeDefined()
    expect(document).toBeDefined()

    expect(wrapper.vm.focus).toBeDefined()
    expect(typeof wrapper.vm.focus).toBe('function')
    expect(wrapper.vm.blur).toBeDefined()
    expect(typeof wrapper.vm.blur).toBe('function')
    expect($input.element).not.toBe(document.activeElement)

    wrapper.vm.focus()
    await waitNT(wrapper.vm)
    expect($input.element).toBe(document.activeElement)

    wrapper.vm.blur()
    await waitNT(wrapper.vm)
    expect($input.element).not.toBe(document.activeElement)

    wrapper.destroy()
  })

  // These tests are wrapped in a new describe to limit the scope
  // of the `getBoundingClientRect()` mock
  describe('prop `autofocus`', () => {
    const origGetBCR = Element.prototype.getBoundingClientRect

    beforeEach(() => {
      // Mock `getBoundingClientRect()` so that the `isVisible(el)` test returns `true`
      // In our test below, all pagination buttons would normally be visible
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
      // Restore prototype
      Element.prototype.getBoundingClientRect = origGetBCR
    })

    it('works when true', async () => {
      const wrapper = mount(BFormCheckbox, {
        attachTo: document.body,
        propsData: {
          checked: false,
          autofocus: true
        },
        slots: {
          default: 'foobar'
        }
      })

      expect(wrapper.vm).toBeDefined()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $input = wrapper.find('input')
      expect($input.exists()).toBe(true)
      expect(document).toBeDefined()
      expect(document.activeElement).toBe($input.element)

      wrapper.destroy()
    })

    it('does not auto focus when false', async () => {
      const wrapper = mount(BFormCheckbox, {
        attachTo: document.body,
        propsData: {
          checked: false,
          autofocus: false
        },
        slots: {
          default: 'foobar'
        }
      })

      expect(wrapper.vm).toBeDefined()
      await waitNT(wrapper.vm)
      await waitRAF()

      const $input = wrapper.find('input')
      expect($input.exists()).toBe(true)
      expect(document).toBeDefined()
      expect(document.activeElement).not.toBe($input.element)

      wrapper.destroy()
    })
  })
})
