import { test, expect } from '@playwright/test';
import { story } from './helpers';

test.describe('GlTruncate', () => {
  const text =
    'src/thisIs/AVeryLongFilePath/that/needs/to/be/smartly/truncated/from/the/middle/so/we/dont/lose/important/information/here.vue';

  test.beforeEach(({ page }) => {
    page.setViewportSize({
      width: 500,
      height: 100,
    });
    page.goto(
      story('utilities/truncate', {
        args: {
          text,
          position: 'end',
          withTooltip: true,
        },
      })
    );
  });

  test('shows a tooltip only when text is being truncated', async ({ page }) => {
    // Hover over the truncated text to reveal the tooltip
    await page.getByTestId('truncate-end-container').hover();
    await expect(page.getByRole('tooltip')).toBeVisible();
    await expect(page.getByRole('tooltip')).toContainText(text);

    // Hover outside of the text to hide the tooltip
    await page.locator('body').hover({ position: { x: 50, y: 50 }, force: true });
    await expect(page.getByRole('tooltip')).not.toBeVisible();

    // Resize the viewport so that the text doesn't need to be truncated anymore
    page.setViewportSize({
      width: 1500,
      height: 800,
    });

    // Hover over the text again, the tooltip should not show up anymore
    await page.getByTestId('truncate-end-container').hover();
    await expect(page.getByRole('tooltip')).not.toBeVisible();
  });
});
