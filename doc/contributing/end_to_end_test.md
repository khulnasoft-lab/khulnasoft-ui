# End to end testing

Complex components require integration tests. We use [Cypress](https://docs.cypress.io/) as an end
to end test framework to test components hierarchies and integrations with dependencies.

## Adding new tests

Tests should be added in the `cypress/e2e` folder when testing a component
in isolation through unit tests is not enough to provide thorough test coverage.

For every story within `src/components/**/*.stories.js`,
a corresponding axe accessibility check should be added.

## Running Cypress tests

Tests can be run locally by starting Storybook
on `http://localhost:9001` and opening the Cypress dashboard.
This can be done by running the following commands in separate shells:

```shell
yarn storybook
```

```shell
yarn run cypress open
```

To run tests as a headless browser, run the following command:

```shell
yarn test:integration
```

In both cases, the server needs to be running.

## Axe accessibility tests

Storybook is integrated with `storybook/addon-a11y` based on
[axe](https://github.com/dequelabs/axe-core) to report failures.
Using [cypress-axe](https://github.com/component-driven/cypress-axe),
these checks can be automated and regressions can be avoided.

We can document the requirements for the test corresponding to
each story in `stories.js` file as follows:

```markdown
Implement a11y tests to cover the following GlDisclosureDropdown states

- Default
  - with args (startOpened: false)
  - with args (startOpened: true)
- Groups
  - with args (startOpened: false)
  - with args (startOpened: true)
- ...
```

These can be translated into axe accessibility tests for `GlDisclosureDropdown` component:

```js
describe('stories', () => {
  function checkA11yDropdownOpened() {
    cy.visitStory('base/dropdown/disclosure-dropdown');
  }

  function checkA11yDropdownClosed() {
    cy.visitStory('base/dropdown/disclosure-dropdown', {
      args: {
        startOpened: false,
      },
    });
  }

  function checkA11yDropdownWithGroupsOpened() {
    cy.visitStory('base/dropdown/disclosure-dropdown', {
      story: 'groups',
    });
  }

  function checkA11yDropdownWithGroupsClosed() {
    cy.visitStory('base/dropdown/disclosure-dropdown', {
      story: 'groups',
      args: {
        startOpened: false,
      },
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11yDropdownOpened,
      checkA11yDropdownClosed,
      checkA11yDropdownWithGroupsOpened,
      checkA11yDropdownWithGroupsClosed,
    });
  });
});
```

### `@a11y` test tag

Every `it` block that runs accessibility tests should have the `@a11y` tag. This
tag ensures that the accessibility test runs in the Chrome Web Browser. Running
tests in Chrome is a requirement to fire native events. See the
[Running accessibility tests](#running-accessibility-tests) section for more
details.

### `glRunA11yTests` helper

The `glRunA11yTests` helper runs each test, logging the name of the given test
and calling `glCheckA11y` at the end of each test. This is needed to help
improve maintainability while working under a single `it` (see [below remarks](#remarks)).

#### Best practices

Don't loop over several stories in the function that you pass to `glRunA11yTests`.
This helper will only run the accessibility checks in the last story that the
function visited, for example:

```javascript
// BAD
// Only the last item in the stories array will be tested by the
// glRunA11yTests helper
function checkA11YSearchBoxDisabled() {
  stories.forEach((story) => {
    cy.visitStory('base/search-box-by-type', {
      story,
    });
  });
}

it('passes axe accessibility audits', { tags: '@a11y' }, () => {
  cy.glRunA11yTests({
    checkA11YSearchBoxDisabled,
  });
});

// GOOD
// We will run the A11y accessibility checks for each story
// passed as a parameter to the checkA11YSearchBoxDisabled
// function
function checkA11YSearchBoxDisabled(story) {
  cy.visitStory('base/search-box-by-type', {
    story,
  });
}

it('passes axe accessibility audits', { tags: '@a11y' }, () => {
  stories.forEach((story) => {
    cy.glRunA11yTests({
      [`checkA11YSearchBoxDisabled-${story}`] checkA11YSearchBoxDisabled,
    });
  });
});
```

### Testing hover state by firing native events

You can use the `realHover` command to fire a native
hover event in a DOM element and test its hover state.

```javascript
function checkA11YLabelHoverState() {
  cy.visitStory('base/label');

  cy.get('.gl-label a').realHover();
}
```

### Running accessibility tests

Use the command `yarn cy:a11y` to run the axe accessibility tests. If you use the Cypress Dashboard
by running `yarn cypress open`, choose Chromium as the browser to run the tests. Automated
accessibility tests use the
[cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events)
to fire native events in the browser.
This library uses the [Chrome Devtools Protocol](https://chromedevtools.github.io/devtools-protocol/)
and allows us to perform accessibility checks in a component's hover state.
It is limited to only
[chromium-based browsers](https://github.com/dmtrKovalenko/cypress-real-events#requirements).

### Remarks

Note that we want to minimise the number of `it` blocks for [performance reasons](https://docs.cypress.io/guides/references/best-practices#Creating-Tiny-Tests-With-A-Single-Assertion).
