// .storybook/test-runner.js
const { join } = require('path');
const { setTimeout } = require('timers/promises');

const { getStoryContext } = require('@storybook/test-runner');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
const { getResetAnimationsCSS } = require('../src/utils/test_utils');

const customSnapshotsDir = join(__dirname, '../tests/__image_snapshots__');

module.exports = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postRender(page, context) {
    // Get entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);

    // Do not test screenshots of pages where we have them disabled
    if (storyContext.parameters?.storyshots?.disable) {
      return;
    }

    // Fixing the Animation by inlining
    // previous approach with external file was flaky for the animation
    page.addStyleTag({
      content: getResetAnimationsCSS(),
    });

    await page.evaluate(() => {
      document.querySelectorAll('animate').forEach((el) => {
        el.setAttribute('repeatCount', 'indefinite');
        el.setAttribute('dur', 'indefinite');
      });
    });

    // Wait a little for the styles to apply
    await setTimeout(500);

    // If you want to take screenshot of multiple browsers, use
    // page.context().browser().browserType().name() to get the browser name to prefix the file name
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: join(customSnapshotsDir, page.context().browser().browserType().name()),
      customSnapshotIdentifier: context.id,
      failureThreshold:
        'FAILURE_THRESHOLD' in process.env ? parseFloat(process.env.FAILURE_THRESHOLD) : 1,
      failureThresholdType: process.env.FAILURE_THRESHOLD_TYPE || 'pixel',
    });
  },
};
