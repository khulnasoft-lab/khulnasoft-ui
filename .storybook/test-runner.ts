import { TestRunnerConfig, waitForPageReady } from '@storybook/test-runner';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { getResetAnimationsCSS } from '../src/utils/test_utils';

type Threshold = 'pixel' | 'percent';

const customSnapshotsDir = `${process.cwd()}/tests/__image_snapshots__`;

const defaultFailureThresholdType = 'pixel';
const defaultFailureThreshold = 1;

// Charts visual tests tend to be slightly flaky due to `echarts` drawing being non-deterministic.
// To avoid irrelevant failures, we apply custom failure threshold to charts visual tests.
const chartsFailureThresholdType = 'percent';
const chartsFailureThreshold = 0.0018;

const isChart = ({ title }) => title.startsWith('charts/');

const getMatchOptions = (context) => {
  const failureThresholdType: Threshold = isChart(context)
    ? chartsFailureThresholdType
    : defaultFailureThresholdType;
  const failureThreshold = isChart(context) ? chartsFailureThreshold : defaultFailureThreshold;

  return {
    failureThreshold,
    failureThresholdType,
  };
};

// For now, we generate identifiers that match legacy storyshots-generated files so that Git
// understands we are moving files, not creating new ones.
const getSnapshotIdentified = (context) =>
  `storyshots-spec-js-image-storyshots-${context.id.replace('--', '-')}-1-snap`;

// We default to Puppeteer's viewport size to preserve storyshots image sizes and avoid polluting
// the diffs with unrelated changes.
const DEFAULT_VIEWPORT_SIZE = { width: 800, height: 600 };

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async preVisit(page) {
    page.setViewportSize(DEFAULT_VIEWPORT_SIZE);

    // Wait until assets have finished loading. It is worth noting that we ran into several timing
    // issues while setting up Test Runner that were eventually addressed by the addition of an
    // arbitrary timeout below in the `postVisit` hook. That works around the fact that
    // `waitForPageReady` does not seem to work as expected as some screenshots were sometimes
    // captured before images or fonts had finished loading. To reduce the risk of flakiness, we are
    // therefore relying on several waits that should eventually be consolidated, which may require
    // a fix in the upstream project.
    await waitForPageReady(page);
  },
  async postVisit(page, context) {
    // Reset SVG animations
    await page.evaluate(() => {
      document.querySelectorAll('animate').forEach((el) => {
        el.setAttribute('repeatCount', 'indefinite');
        el.setAttribute('dur', 'indefinite');
      });
    });

    // Reset CSS animations
    await page.addStyleTag({
      content: getResetAnimationsCSS(),
    });

    // Wait until the component is mounted
    await page.waitForSelector('#storybook-root.vue-component-mounted');

    // Wait until assets have finished loading again (useful if some play function caused new assets to be requested)
    await waitForPageReady(page);

    // We wait for an arbitrary amount of time to make sure assets have actually finished loading and
    // elements are properly positioned. For the time being, this is required as `waitForPageReady`
    // isn't 100% reliable.
    await page.waitForTimeout(500);

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: getSnapshotIdentified(context),
      ...getMatchOptions(context),
    });
  },
  tags: {
    skip: ['skip-visual-test'],
  },
};
export default config;
