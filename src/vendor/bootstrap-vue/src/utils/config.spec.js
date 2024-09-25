import { createLocalVue } from '@vue/test-utils'
import { isVue3 } from '../../src/vue'
import { BootstrapVue } from '../../src'
import { ToastPlugin } from '../../src/components/toast'
import { BVConfigPlugin } from '../../src/bv-config'
import { setConfig, resetConfig } from './config-set'
import {
  getBreakpoints,
  getBreakpointsDown,
  getBreakpointsUp,
  getComponentConfig,
  getConfig,
  getConfigValue
} from './config'

describe('utils/config', () => {
  afterEach(() => {
    resetConfig()
  })

  it('getConfig() works', async () => {
    expect(getConfig()).toEqual({})
  })

  it('setConfig() works', async () => {
    const config = {
      BButton: { variant: 'danger' }
    }
    const breakpointsConfig = {
      breakpoints: ['aa', 'bb', 'cc', 'dd', 'ee']
    }
    expect(getConfig()).toEqual({})

    // Try a component config
    setConfig(config)
    expect(getConfig()).toEqual(config)
    expect(getConfig()).not.toBe(config)
    expect(getComponentConfig('BButton')).toEqual(config.BButton)
    expect(getComponentConfig('BButton')).not.toBe(config.BButton)
    expect(getComponentConfig('BButton', 'variant')).toEqual('danger')

    // Try breakpoint config (should merge)
    setConfig(breakpointsConfig)
    expect(getBreakpoints()).toEqual(breakpointsConfig.breakpoints)
    expect(getBreakpoints()).not.toBe(breakpointsConfig.breakpoints)
    expect(getConfigValue('breakpoints')).toEqual(breakpointsConfig.breakpoints)
    // should leave previous config
    expect(getComponentConfig('BButton', 'variant')).toEqual('danger')
    // Should merge config
    expect(getConfig()).toEqual({ ...config, ...breakpointsConfig })

    // Reset the configuration
    resetConfig()
    expect(getConfig()).toEqual({})
  })

  if (!isVue3) {
    // We do not have complete localVue support, so resetting config does not work in proper way
    it('config via Vue.use(BootstrapVue) works', async () => {
      const localVue = createLocalVue()
      const config = {
        BButton: { variant: 'foobar' }
      }

      expect(getConfig()).toEqual({})

      localVue.use(BootstrapVue, config)
      expect(getConfig()).toEqual(config)

      // Reset the configuration
      resetConfig()
      expect(getConfig()).toEqual({})
    })

    it('config via Vue.use(ComponentPlugin) works', async () => {
      const localVue = createLocalVue()
      const config = {
        BButton: { variant: 'foobar' }
      }

      expect(getConfig()).toEqual({})

      localVue.use(ToastPlugin, config)
      expect(getConfig()).toEqual(config)

      // Reset the configuration
      resetConfig()
      expect(getConfig()).toEqual({})
    })

    it('config via Vue.use(BVConfig) works', async () => {
      const localVue = createLocalVue()
      const config = {
        BButton: { variant: 'foobar' }
      }

      expect(getConfig()).toEqual({})

      localVue.use(BVConfigPlugin, config)
      expect(getConfig()).toEqual(config)

      // Reset the configuration
      resetConfig()
      expect(getConfig()).toEqual({})
    })
  }

  it('getConfigValue() works', async () => {
    const config = {
      formControls: { size: 'sm' }
    }
    setConfig(config)

    expect(getConfigValue('formControls')).toEqual(config.formControls)
    // Should return a deep clone
    expect(getConfigValue('formControls')).not.toBe(config.formControls)
    // Shape of returned value should be the same each call
    expect(getConfigValue('formControls')).toEqual(getConfigValue('formControls'))
    // Should return undefined for not found
    expect(getConfigValue('foo.bar[1].baz')).toBeUndefined()
  })

  it('getComponentConfig() works', async () => {
    const config = {
      BButton: { variant: 'info' }
    }
    setConfig(config)

    // Specific component config key
    expect(getComponentConfig('BButton', 'variant')).toEqual('info')
    // Component's full config
    expect(getComponentConfig('BButton')).toEqual(config.BButton)
    // Should return a deep clone for full config
    expect(getComponentConfig('BButton')).not.toBe(config.BButton)
    // Should return empty object for not found component
    expect(getComponentConfig('foobar')).toEqual({})
    // Should return undefined for not found component key
    expect(getComponentConfig('BButton', 'foobar')).toBeUndefined()
  })

  it('getBreakpoints() works', async () => {
    const breakpointsConfig = {
      breakpoints: ['aa', 'bb', 'cc', 'dd', 'ee']
    }

    expect(getBreakpoints()).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
    // Should return a deep clone
    expect(getBreakpoints()).not.toBe(getBreakpoints())

    // Set new breakpoints
    setConfig(breakpointsConfig)
    expect(getBreakpoints()).toEqual(breakpointsConfig.breakpoints)
    // Should return a deep clone
    expect(getBreakpoints()).not.toBe(getBreakpoints())
    expect(getBreakpoints()).not.toBe(breakpointsConfig.breakpoints)
  })

  it('getBreakpointsUp() works', async () => {
    expect(getBreakpointsUp()).toEqual(['', 'sm', 'md', 'lg', 'xl'])
    // Should return a deep clone
    expect(getBreakpointsUp()).not.toBe(getBreakpointsUp())
  })

  it('getBreakpointsDown() works', async () => {
    expect(getBreakpointsDown()).toEqual(['xs', 'sm', 'md', 'lg', ''])
    // Should return a deep clone
    expect(getBreakpointsDown()).not.toBe(getBreakpointsDown())
  })
})
