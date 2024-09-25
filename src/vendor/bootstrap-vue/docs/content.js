import { importAll, parseVersion } from '~/utils'
import { version, dependencies, devDependencies, description } from '~/../package.json'

const componentsContext = require.context('~/../src/components/', true, /package.json/)
export const components = importAll(componentsContext)

const directivesContext = require.context('~/../src/directives/', true, /package.json/)
export const directives = importAll(directivesContext)

const referenceContext = require.context('~/markdown/reference', true, /meta.json/)
export const reference = importAll(referenceContext)

export const nav = [
  {
    title: 'Getting Started',
    base: '',
    exact: true
  },
  {
    title: 'Components',
    base: 'components/',
    pages: components,
    description: 'BootstrapVue components and component group plugins.'
  },
  {
    title: 'Directives',
    base: 'directives/',
    pages: directives,
    description: 'BootstrapVue directives and directive group plugins.'
  },
  {
    title: 'Reference',
    base: 'reference/',
    pages: reference,
    description: 'BootstrapVue and Bootstrap reference, and additional resources documentation.'
  }
]

// RegExp to grab the minor version from a full version
const minorRE = /^(\d+\.\d+)(\..+)$/
// RegExp to grab the major version from a full version
const majorRE = /^(\d+)(\.\d+\..+)$/

export const bootstrapVersion = parseVersion(dependencies.bootstrap)
export const bootstrapVersionMinor = bootstrapVersion.replace(minorRE, '$1')
export const bootstrapVersionMajor = bootstrapVersion.replace(majorRE, '$1')

export const popperVersion = parseVersion(dependencies['popper.js'])
export const popperVersionMinor = popperVersion.replace(minorRE, '$1')
export const popperVersionMajor = popperVersion.replace(majorRE, '$1')

export const portalVueVersion = parseVersion(dependencies['portal-vue'])
export const portalVueVersionMinor = portalVueVersion.replace(minorRE, '$1')
export const portalVueVersionMajor = portalVueVersion.replace(majorRE, '$1')

export const nuxtVersion = parseVersion(devDependencies.nuxt)
export const nuxtVersionMinor = nuxtVersion.replace(minorRE, '$1')
export const nuxtVersionMajor = nuxtVersion.replace(majorRE, '$1')

export const vueVersion = parseVersion(devDependencies.vue)
export const vueVersionMinor = vueVersion.replace(minorRE, '$1')
export const vueVersionMajor = vueVersion.replace(majorRE, '$1')

export const bvDescription = description

export { version }
