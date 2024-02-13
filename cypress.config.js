const { defineConfig } = require('cypress');

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  env: {
    // Use by the @cypress/grep package
    // https://github.com/cypress-io/cypress/tree/develop/npm/grep#pre-filter-specs-grepfilterspecs
    grepFilterSpecs: true,
    // Use by the @cypress/grep package
    // https://github.com/cypress-io/cypress/tree/develop/npm/grep#omit-filtered-tests-grepomitfiltered
    grepOmitFiltered: true,
  },
  e2e: {
    baseUrl: 'http://localhost:9001',
    setupNodeEvents(on) {
      on('task', {
        log(message) {
          // eslint-disable-next-line no-console
          console.log(message);

          return null;
        },
        table(message) {
          // eslint-disable-next-line no-console
          console.table(message);

          return null;
        },
      });
    },
  },
});
