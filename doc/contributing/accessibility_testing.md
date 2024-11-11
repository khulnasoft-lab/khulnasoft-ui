# Accessibility testing

Storybook is integrated with `storybook/addon-a11y` based on
[axe](https://github.com/dequelabs/axe-core) to report failures.
We use the [Storybook Test Runner](https://github.com/storybookjs/test-runner)
addon to run accessibility tests based on [storybook](https://github.com/storybookjs/storybook) stories.
These tests run alongside [visual regressions testing](doc/contributing/visual_testing.md).

When component or dependency updates result in an accessibility violation, accessibility tests fail.

To inspect the violations causing the pipeline to fail, browse the failing `visual` job's artifacts.

## Viewing and fixing accessibility violations

* During development:
  * Start Storybook on `http://localhost:9001`.
    This can be done by running the following command:

    ```shell
    yarn storybook
    ```

  * Use the accessibility panel in Storybook to identify and fix violations.
  * This provides immediate feedback without waiting for CI jobs.
* In CI pipeline:
  * Accessibility tests will run as part of the CI process.
  * Check the CI job output for any reported violations.
* Fixing violations:
  * Address each violation reported by the test runner.
  * Refer to the Storybook accessibility panel for detailed information on each issue.
  * Update the component/story code to resolve the violation.
  * Re-run the tests to confirm the fix.

### Handling new violations

As `axe-core` (the underlying accessibility testing engine) is updated, new violations may be detected.
To handle these:

* Review the new violations in the test output or Storybook Accessibility panel.
* Assess each violation for validity and impact.
* Create issues for legitimate violations that need addressing.
* Update tests if necessary, using the `getA11yParameters.skipRules` option
  judiciously for false positives or non-applicable rules.

### Excluding stories from accessibility testing

Excluding a story from [visual regression testing](doc/contributing/visual_testing.md#excluding-stories-from-visual-testing)
using `skip-visual-tests` also excludes it from accessbility tests.

## Configuring the addon

It also lets us fine-tune the [addon configuration](https://storybook.js.org/docs/writing-tests/accessibility-testing#configure)
or override axe ruleset.

### Component level accessibility configuration

Update your story's default export and add a parameter with the required configuration.

```js
import CustomActions from './custom_actions.vue';
 
export default {
  component: CustomActions,
  parameters: {
    a11y: {
      // Optional selector to inspect
      element: '#storybook-root',
      config: {
        rules: [
          {
            // The autocomplete rule will not run based on the CSS selector provided
            id: 'autocomplete-valid',
            selector: '*:not([autocomplete="nope"])',
          },
          {
            // Setting the enabled option to false will disable checks
            // for this particular rule on all stories.
            id: 'image-alt',
            enabled: false,
          },
        ],
      },
      options: {},
      manual: true,
    },
  },
};
```

### Story-level accessibility configuration

Customize the accesibility ruleset at the story level by
updating your story to include a new parameter:

```js
// custom_actions.stories.js
export const CustomActions = () => ({
  // ...
});
CustomActions.parameters = {
  a11y: {
    // Optional selector to inspect
    element: '#storybook-root',
    config: {
      rules: [
        {
          // The autocomplete rule will not run based on the CSS selector provided
          id: 'autocomplete-valid',
          selector: '*:not([autocomplete="nope"])',
        },
        {
          // Setting the enabled option to false will disable checks 
          // for this particular rule on all stories.
          id: 'image-alt',
          enabled: false,
        },
      ],
    },
    options: {},
  },
},
```
