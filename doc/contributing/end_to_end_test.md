# End to end testing

Complex components require integration tests. We use [Cypress](https://docs.cypress.io/) as an end
to end test framework to test components hierarchies and integrations with dependencies.

## Adding new tests

Tests should be added in the `cypress/e2e` folder, only when testing a component in
isolation through unit tests is not enough to provide thorough test coverage.

## Running Cypress tests

Tests can be run locally with the following command, which opens the cypress dashboard:

```shell
yarn run cypress open
```

To run tests as a headless browser, run the following command:

```shell
yarn test:integration
```

In both cases, the server needs to be running.
