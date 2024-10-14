module.exports = api => {
  api.cache(true)

  return {
    presets: [
      ['@babel/env', { useBuiltIns: 'entry', corejs: { version: 3 }, targets: { node: 'current' } }]
    ]
  }
}
