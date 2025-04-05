# Visual regressions testing

We use the [Storybook Test Runner](https://github.com/storybookjs/test-runner)
addon to generate and compare image snapshots based on [storybook](https://github.com/storybookjs/storybook)
stories. `Storybook Test Runner` runs in every pipeline in either of the following jobs:

* The `visual` job runs visual regression tests against all stories. It always runs on the
  default branch, in merge trains, and can be run manually in other branches.
  This job can take a while to complete and should only be run when absolutely needed.
* The `visual_minimal` job runs in MR pipelines and only tests the components that actually changed
  in the branch to avoid a time-consuming full visual regression testing suite.
  Note that if the changes affect a component that wasn't actually touched, `visual_minimal`
  might not report it. In such case, you might want to run the `visual` job manually to confirm that
  no regression is being introduced.

When component or dependency updates result in user-facing changes, visual regression tests fail.

Before proceeding make sure that the updated image snapshots:

* Still comply with the design system guidelines.
* Do not include any unexpected visual elements.

To inspect the image snapshots causing the pipeline to fail, browse the failing `visual` or `visual_minimal`
job's artifacts. The relevant snapshots are added in the `tests/__image_snapshots__/__diff_output__`
directory.

Once you have confirmed that visual differences are expected and aren't regressions, trigger the
manual CI job `update_screenshots` to regenerate the snapshots.

## Excluding stories from visual testing

If your story doesn't showcase any relevant UI components, you may want to exclude it from visual
regressions tests. Do so by adding the `skip-visual-test` tag to individual stories. You may add the
tag to a `.stories.js` file's default export to exclude all of the component's stories at once.

> **Note:** While skipping visual tests on given stories is a possibility, it is not meant to skip
> non-deterministic tests. If a story contains random elements, or any other variable that could
> lead to flakiness, you should make sure that it is deterministic in the test environment.

### Excluding a whole component

To exclude a whole component from visual tests, define the parameter in the default export:

```js
export default {
  title: 'base/accordion/accordion-item',
  component: GlAccordionItem,
  tags: ['skip-visual-test'],
};
```

### Excluding a single story

To exclude a single story from visual tests, set the parameter in the story module:

```js
export const CustomActions = () => ({
  // ...
});
CustomActions.tags = ['skip-visual-test'];
```

## Simulating user interactions

Some stories might not showcase relevant states by only mounting components. It is sometimes
necessary to trigger simulated user interactions when stories load so that the component's purpose
is surfaced initially, and for visual regression tests to cover as much ground as possible.

For example, `GlTooltip` requires the toggle to be interacted with so that the tooltip actually
shows up.

In such cases, use Storybook's `play` functions:

```js
import { userEvent, within, waitFor, expect } from "@storybook/test";

Tooltip.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Click on the tooltip's toggle
  const button = canvas.getByRole("button");
  await userEvent.click(button);

  // Make sure the tooltip actually is visible
  await waitFor(() =>
    expect(within(document).getByRole("tooltip")).toBeVisible()
  );
};
```

When applicable, make sure to check that the toggled element(s) is visible at the end of the `play`
function as this helps prevent flakiness in visual regression tests.

Read more on `play` functions in [Storybook's documentation](https://storybook.js.org/docs/writing-stories/play-function).
