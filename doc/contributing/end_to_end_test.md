# End to end testing

Complex components require integration tests. We use [Playwright]<https://playwright.dev/>) as an end
to end test framework to test components hierarchies and integrations with dependencies.

## Adding new tests

Tests should be added in the `e2e/` folder when testing a component
in isolation through unit tests is not enough to provide thorough test coverage.

For every story within `src/components/**/*.stories.js`,
a corresponding axe accessibility check should be added.

## Running Playwright tests

Tests can be run locally by starting Storybook
on `http://localhost:9001` and opening the Playwright UI.
This can be done by running the following commands in separate shells:

```shell
yarn storybook
```

```shell
yarn test:e2e:ui
```

To run tests as a headless browser, run the following command:

```shell
yarn test:e2e
```

> **Note:** If you _did not_ run Storybook manually before running Playwright tests, Playwright
> attempts to boot the statically built Storybook via the `yarn storybook:run` command. This
> requires the `yarn storybook:build:test` command to have been run beforehand.

## Axe accessibility tests

Storybook is integrated with `storybook/addon-a11y` based on
[`axe`](https://github.com/dequelabs/axe-core) to report failures.
Using [`@axe-core/playwright`](https://www.npmjs.com/package/@axe-core/playwright),
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
import { test } from '@playwright/test';
import { story, axeAnalyzeStory } from './helpers';

test.describe('Disclosure dropdown', async () => {
  async function checkA11yDropdownWithGroupsOpened(page) {
    await page.goto(
      story('base/dropdown/disclosure-dropdown', {
        story: 'groups',
      })
    );

    await axeAnalyzeStory(page);
  }

  async function checkA11yDropdownWithGroupsClosed(page) {
    await page.goto(
      story('base/dropdown/disclosure-dropdown', {
        story: 'groups',
        args: {
          startOpened: false,
        },
      })
    );

    await axeAnalyzeStory(page);
  }

  async function checkA11yDropdownWithCustomGroupItemsAndToggle(page) {
    await page.goto(
      story('base/dropdown/disclosure-dropdown', {
        story: 'custom-groups-items-and-toggle',
      })
    );

    await axeAnalyzeStory(page);
  }

  test('it passes axe accessibility audits', { tag: '@a11y' }, async ({ page }) => {
    await checkA11yDropdownWithGroupsOpened(page);
    await checkA11yDropdownWithGroupsClosed(page);
    await checkA11yDropdownWithCustomGroupItemsAndToggle(page);
  });
});
```

### `@a11y` test tag

Every `test` block that runs accessibility tests should have the `@a11y` tag.

### Running accessibility tests

Use the command `yarn test:e2e --project=a11y` to run the axe accessibility tests.

### Cypress tests

We historically used Cypress to run E2E and accessibility tests. We have decided to switch to
Playwright which has more reliable browser events handling, and has a more intuitive API. Please do
not add or modify Cypress specs, use Playwright instead.
