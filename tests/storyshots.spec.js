import * as Vue from 'vue';
import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import { getResetAnimationsCSS } from '~/utils/test_utils';

registerRequireContextHook();

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

const defaultFailureThresholdType = 'pixel';
const defaultFailureThreshold = 1;

// Charts visual tests tend to be slightly flaky due to `echarts` drawing being non-deterministic.
// To avoid irrelevant failures, we apply custom failure threshold to charts visual tests.
const chartsFailureThresholdType = 'percent';
const chartsFailureThreshold = 0.0018;

const getMatchOptions = ({ context: { kind } }) => {
  const isChart = kind.startsWith('charts/');
  const failureThresholdType = isChart ? chartsFailureThresholdType : defaultFailureThresholdType;
  const failureThreshold = isChart ? chartsFailureThreshold : defaultFailureThreshold;

  return {
    failureThreshold,
    failureThresholdType,
  };
};

initStoryshots({
  framework: Vue.version.startsWith('3') ? 'vue3' : 'vue',
  suite: 'Image storyshots',
  test: imageSnapshot({
    storybookUrl: 'http://localhost:9001',
    beforeScreenshot,
    getGotoOptions,
    getMatchOptions,
  }),
});
