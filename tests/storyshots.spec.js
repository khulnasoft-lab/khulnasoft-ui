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

const failureThresholdType = process.env.FAILURE_THRESHOLD_TYPE || 'pixel';
const failureThreshold =
  'FAILURE_THRESHOLD' in process.env ? parseFloat(process.env.FAILURE_THRESHOLD) : 1;

const getMatchOptions = () => ({
  failureThreshold,
  failureThresholdType,
});

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
