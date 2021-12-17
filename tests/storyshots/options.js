import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import { getResetAnimationsCSS } from '../../src/utils/test_utils';

const beforeScreenshot = async (page) => {
  // Reset SVG animations
  await page.evaluate(() => {
    document.querySelectorAll('animate').forEach((el) => {
      el.setAttribute('repeatCount', 'indefinite');
      el.setAttribute('dur', 'indefinite');
    });
  });

  // Fixing the Animation by inlining, previous approach with external file was flaky for the animation
  page.addStyleTag({
    content: getResetAnimationsCSS(),
  });
};

const getGotoOptions = () => ({
  waitUntil: 'networkidle0',
});

const failureThresholdType = process.env.FAILURE_THRESHOLD_TYPE || 'pixel';
const failureThreshold =
  'FAILURE_THRESHOLD' in process.env ? parseFloat(process.env.FAILURE_THRESHOLD) : 1;

const getMatchOptions = () => ({
  failureThreshold,
  failureThresholdType,
});

export const storyshotsOptions = imageSnapshot({
  storybookUrl: 'http://localhost:9001',
  beforeScreenshot,
  getGotoOptions,
  getMatchOptions,
});
