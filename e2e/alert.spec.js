import { test } from '@playwright/test';
import { story, axeAnalyzeStory } from './helpers';

test.describe('GlAlert', () => {
  async function checkA11YDefaultState(page) {
    await page.goto(story('base/alert'));

    await axeAnalyzeStory(page);
  }

  async function checkA11YAllAlertVariants(page) {
    await page.goto(
      story('base/alert', {
        storyName: 'variants',
      })
    );

    await axeAnalyzeStory(page);
  }

  async function checkA11YCustomActions(page) {
    await page.goto(
      story('base/alert', {
        storyName: 'custom-actions',
      })
    );

    await axeAnalyzeStory(page);
  }

  test('it passes axe accessibility audits', { tag: '@a11y' }, async ({ page }) => {
    await checkA11YDefaultState(page);
    await checkA11YAllAlertVariants(page);
    await checkA11YCustomActions(page);
  });
});
