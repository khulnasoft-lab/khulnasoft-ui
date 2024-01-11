import { TestRunnerConfig } from '@storybook/test-runner';
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
  },
  async postVisit(page, context) {
    // Reset SVG animations
    await page.evaluate(() => {
      document.querySelectorAll('animate').forEach((el) => {
        el.setAttribute('repeatCount', 'indefinite');
        el.setAttribute('dur', 'indefinite');
      });
    });

    // Fixing the Animation by inlining, previous approach with external file was flaky for the animation
    await page.addStyleTag({
      content: getResetAnimationsCSS(),
    });

    // We wait for an arbitrary amount of time to make sure all elements are visible following
    // programmatically-triggered events when the story loads (tooltips, toasts, etc.).
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
